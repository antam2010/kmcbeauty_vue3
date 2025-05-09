#!/bin/bash

# .env.stage 파일 로딩
set -a  # export 자동
. .env.stage
set +a  # export 자동 종료

# 필수 환경변수 체크
: "${SCP_USER:?SCP_USER 환경변수가 설정되지 않았습니다}"
: "${SCP_HOST:?SCP_HOST 환경변수가 설정되지 않았습니다}"
: "${SCP_DIR:?SCP_DIR 환경변수가 설정되지 않았습니다}"
: "${SCP_PORT:?SCP_PORT 환경변수가 설정되지 않았습니다}"

echo "[build] 빌드 시작"
bun run build --mode stage

if [ $? -ne 0 ]; then
  echo "[build] 빌드 실패"
  exit 1
fi

echo "[build] 빌드 완료"

echo "[deploy] 파일 전송 시작"
scp -P "$SCP_PORT" -r ./dist/* "$SCP_USER@$SCP_HOST:$SCP_DIR"

if [ $? -ne 0 ]; then
  echo "[deploy] 파일 전송 실패"
  exit 1
fi

echo "[deploy] 파일 전송 완료"
