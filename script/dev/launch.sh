# 開発用ローカルサーバを起動します.

byobu new -d -s sample-page "cd /repo/src/sample-page && npm install && npm run dev"
byobu new -d -s sample-worker "cd /repo/src/sample-worker && npm install && npm run dev"
byobu ls
echo "byobu a -t [session name] でセッションにアタッチできます."
cd /repo/src