#!/bin/bash
IID_FILE=image.iid
TAG=$(date +%Y%m%d%H%M%S)

buildah bud -f Containerfile.prod -t maw-files --iidfile "${IID_FILE}"
IID=$(cat "${IID_FILE}")
buildah push --creds "${DH_USER}:${DH_PASS}" "${IID}" docker://aerisg222/maw-files:"${TAG}"
buildah push --creds "${DH_USER}:${DH_PASS}" "${IID}" docker://aerisg222/maw-files:latest
