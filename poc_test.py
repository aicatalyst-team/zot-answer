#!/usr/bin/env python3
"""AutoPoC Test Script for zot-answer

Validates the zot-answer extension deployment by checking Kubernetes Job outputs.
Uses kubectl to inspect job completion status and logs.
"""
import json
import os
import subprocess
import sys
import time

NAMESPACE = os.environ.get("NAMESPACE", "poc-zot-answer")
results = []


def run_kubectl(args, timeout=30):
    """Run a kubectl command and return stdout."""
    cmd = ["kubectl"] + args
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        return result.returncode, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return -1, "", "kubectl command timed out"


def test_scenario(name, description, job_name, expected_outputs, timeout=60):
    """Test a job scenario by checking its completion and logs."""
    start = time.time()

    # Check job status
    rc, stdout, stderr = run_kubectl(
        ["get", "job", job_name, "-n", NAMESPACE, "-o", "json"], timeout=15
    )

    if rc != 0:
        r = {
            "scenario_name": name,
            "status": "error",
            "output": stderr[:2000],
            "error_message": f"Failed to get job status: {stderr[:200]}",
            "duration_seconds": round(time.time() - start, 2),
        }
        results.append(r)
        return r

    try:
        job_data = json.loads(stdout)
        status = job_data.get("status", {})
        succeeded = status.get("succeeded", 0)
        failed = status.get("failed", 0)
        conditions = status.get("conditions", [])
    except json.JSONDecodeError:
        r = {
            "scenario_name": name,
            "status": "error",
            "output": stdout[:500],
            "error_message": "Failed to parse job JSON",
            "duration_seconds": round(time.time() - start, 2),
        }
        results.append(r)
        return r

    # Check if job completed
    if succeeded < 1:
        condition_msgs = [c.get("message", "") for c in conditions]
        r = {
            "scenario_name": name,
            "status": "fail",
            "output": f"succeeded={succeeded}, failed={failed}, conditions={condition_msgs}",
            "error_message": f"Job did not succeed. Failed: {failed}",
            "duration_seconds": round(time.time() - start, 2),
        }
        results.append(r)
        return r

    # Get job logs
    rc, logs, stderr = run_kubectl(
        ["logs", f"job/{job_name}", "-n", NAMESPACE], timeout=15
    )

    if rc != 0:
        r = {
            "scenario_name": name,
            "status": "fail",
            "output": stderr[:2000],
            "error_message": f"Failed to get job logs: {stderr[:200]}",
            "duration_seconds": round(time.time() - start, 2),
        }
        results.append(r)
        return r

    # Check expected outputs in logs
    missing = []
    for expected in expected_outputs:
        if expected not in logs:
            missing.append(expected)

    if missing:
        r = {
            "scenario_name": name,
            "status": "fail",
            "output": logs[:2000],
            "error_message": f"Missing expected output: {missing}",
            "duration_seconds": round(time.time() - start, 2),
        }
        results.append(r)
        return r

    r = {
        "scenario_name": name,
        "status": "pass",
        "output": logs[:2000],
        "error_message": None,
        "duration_seconds": round(time.time() - start, 2),
    }
    results.append(r)
    return r


# === SCENARIOS ===

# Scenario 1: Container Startup
print("Testing scenario: container-startup...", file=sys.stderr)
test_scenario(
    name="container-startup",
    description="Verify the extension starts and responds to JSON protocol handshake",
    job_name="zot-answer-startup",
    expected_outputs=[
        '"type":"hello"',
        '"type":"ready"',
        '"type":"shutdown_ack"',
        "PROCESS_EXIT=0",
    ],
)

# Scenario 2: Question Extraction
print("Testing scenario: question-extraction...", file=sys.stderr)
test_scenario(
    name="question-extraction",
    description="Verify question extraction logic with numbered questions input",
    job_name="zot-answer-extraction",
    expected_outputs=[
        '"type":"command_response"',
        '"action":"open_panel"',
        "answer-main",
        "EXIT_CODE=0",
    ],
)

# === END SCENARIOS ===

print(json.dumps({"results": results}, indent=2))
sys.exit(1 if any(r["status"] in ("fail", "error") for r in results) else 0)
