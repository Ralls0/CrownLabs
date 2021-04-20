sed -i".old" 's#<body>#<body><script type="text/javascript" src="/config.js"></script>#' /usr/share/nginx/html/index.html

nginx -g "daemon off;"