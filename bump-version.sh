#!/bin/sh
# 每次发布前运行：更新页面版本号，让浏览器（尤其是微信）加载最新文件
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
sed -i '' -E "s#(data|geo)\.js\?v=[0-9]+#\1.js?v=$V#g; s#const PAGE_VERSION = '[0-9]+'#const PAGE_VERSION = '$V'#" index.html
printf '{ "v": "%s" }\n' "$V" > version.json
echo "version $V"
