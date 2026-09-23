import{_ as e,o as l,c as i,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const x=JSON.parse('{"title":"nginx开机自动启动和chkconfig管理","description":"","frontmatter":{"title":"nginx开机自动启动和chkconfig管理","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","微服务","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx开机自动启动和chkconfig管理.md","filePath":"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx开机自动启动和chkconfig管理.md"}'),t={name:"posts/java快速入门/第九部分：微服务/02-实战-乐优商城/分布式文件系统FastDFS安装教程/nginx开机自动启动和chkconfig管理.md"};function c(r,a,o,p,g,u){return l(),i("div",null,[...a[0]||(a[0]=[n("div",null,[n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Nginx 是一个很强大的高性能Web和反向代理服务器。虽然使用命令行可以对nginx进行各种操作，比如启动等，但是还是根据不太方便。下面介绍在CentOS下安装后，如何设置开机自启动。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**首先，在****linux****系统的****/etc/init.d/****目录下创建****nginx****文件，使用如下命令：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"vim /etc/init.d/nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"**在脚本中添加如下命令：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"#!/bin/sh￼#￼# nginx - this script starts and stops the nginx daemon￼#￼# chkconfig:   - 85 15￼# description:  NGINX is an HTTP(S) server, HTTP(S) reverse \\￼#               proxy and IMAP/POP3 proxy server￼# processname: nginx￼# config:      /etc/nginx/nginx.conf￼# config:      /etc/sysconfig/nginx￼# pidfile:     /var/run/nginx.pid")]),s(`
`),n("span",{class:"line"},[n("span",null,"# Source function library.￼. /etc/rc.d/init.d/functions")]),s(`
`),n("span",{class:"line"},[n("span",null,"# Source networking configuration.￼. /etc/sysconfig/network")]),s(`
`),n("span",{class:"line"},[n("span",null,'# Check that networking is up.￼[ "$NETWORKING" = "no" ] && exit 0')]),s(`
`),n("span",{class:"line"},[n("span",null,'#Nginx命令路径￼nginx="/usr/local/nginx/sbin/nginx"￼prog=$(basename $nginx)￼#Nginx配置文件路径￼NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf"')]),s(`
`),n("span",{class:"line"},[n("span",null,"[ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"lockfile=/var/lock/subsys/nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,'make_dirs() {￼   # make required directories￼   user=`$nginx -V 2\\>&1 | grep "configure arguments:.*--user=" | sed \'s/[^*]*--user=\\([^ ]*\\).*/\\1/g\' -`￼   if [ -n "$user" ]; then￼      if [ -z "`grep $user /etc/passwd`" ]; then￼         useradd -M -s /bin/nologin $user￼      fi￼      options=`$nginx -V 2\\>&1 | grep \'configure arguments:\'`￼      for opt in $options; do￼          if [ `echo $opt | grep \'.*-temp-path\'` ]; then￼              value=`echo $opt | cut -d "=" -f 2`￼              if [ ! -d "$value" ]; then￼                  # echo "creating" $value￼                  mkdir -p $value && chown -R $user $value￼              fi￼          fi￼       done￼    fi￼}')]),s(`
`),n("span",{class:"line"},[n("span",null,'start() {￼    [ -x $nginx ] || exit 5￼    [ -f $NGINX_CONF_FILE ] || exit 6￼    make_dirs￼    echo -n $"Starting $prog: "￼    daemon $nginx -c $NGINX_CONF_FILE￼    retval=$?￼    echo￼    [ $retval -eq 0 ] && touch $lockfile￼    return $retval￼}')]),s(`
`),n("span",{class:"line"},[n("span",null,'stop() {￼    echo -n $"Stopping $prog: "￼    killproc $prog -QUIT￼    retval=$?￼    echo￼    [ $retval -eq 0 ] && rm -f $lockfile￼    return $retval￼}')]),s(`
`),n("span",{class:"line"},[n("span",null,"restart() {￼    configtest || return $?￼    stop￼    sleep 1￼    start￼}")]),s(`
`),n("span",{class:"line"},[n("span",null,'reload() {￼    configtest || return $?￼    echo -n $"Reloading $prog: "￼    killproc $nginx -HUP￼    RETVAL=$?￼    echo￼}')]),s(`
`),n("span",{class:"line"},[n("span",null,"force_reload() {￼    restart￼}")]),s(`
`),n("span",{class:"line"},[n("span",null,"configtest() {￼  $nginx -t -c $NGINX_CONF_FILE￼}")]),s(`
`),n("span",{class:"line"},[n("span",null,"rh_status() {￼    status $prog￼}")]),s(`
`),n("span",{class:"line"},[n("span",null,"rh_status_q() {￼    rh_status \\>/dev/null 2\\>&1￼}")]),s(`
`),n("span",{class:"line"},[n("span",null,'case "$1" in￼    start)￼        rh_status_q && exit 0￼        $1￼        ;;￼    stop)￼        rh_status_q || exit 0￼        $1￼        ;;￼    restart|configtest)￼        $1￼        ;;￼    reload)￼        rh_status_q || exit 7￼        $1￼        ;;￼    force-reload)￼        force_reload￼        ;;￼    status)￼        rh_status￼        ;;￼    condrestart|try-restart)￼        rh_status_q || exit 0￼            ;;￼    *)￼        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"￼        exit 2￼esac')]),s(`
`),n("span",{class:"line"},[n("span",null,"**保存脚本文件后设置文件的执行权限：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"chmod a+x /etc/init.d/nginx")]),s(`
`),n("span",{class:"line"},[n("span",null,"**然后，就可以通过该脚本对****nginx****服务进行管理了：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"/etc/init.d/nginx start￼/etc/init.d/nginx stop")]),s(`
`),n("span",{class:"line"},[n("span",null,"**使用****chkconfig****进行管理**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的方法完成了用脚本管理nginx服务的功能，但是还是不太方便，比如要设置nginx开机启动等。这时可以使用chkconfig来设置。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**先将****nginx****服务加入****chkconfig****管理列表：**")]),s(`
`),n("span",{class:"line"},[n("span",null,"chkconfig --add /etc/init.d/nginx￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"加完这个之后，就可以使用service对nginx进行启动，重启等操作了。")]),s(`
`),n("span",{class:"line"},[n("span",null,"service nginx start￼service nginx stop￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"设置终端模式开机启动：")]),s(`
`),n("span",{class:"line"},[n("span",null,"chkconfig nginx on￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"**如果服务启动时****,****提示以下内容****:**")]),s(`
`),n("span",{class:"line"},[n("span",null,"May 22 17:48:57 gongxm systemd[1]: Starting SYSV: NGINX is an HTTP(S) serve.....￼May 22 17:48:57 gongxm systemd[1]: PID file /var/run/nginx.pid not readable...t.￼May 22 17:48:57 gongxm systemd[1]: Failed to start SYSV: NGINX is an HTTP(S...r.￼May 22 17:48:57 gongxm systemd[1]: Unit nginx.service entered failed state.￼May 22 17:48:57 gongxm systemd[1]: nginx.service failed.￼")]),s(`
`),n("span",{class:"line"},[n("span",null,"**解决方案****:**")]),s(`
`),n("span",{class:"line"},[n("span",null,'1. 修改nginx的配置文件: nginx.conf￼    把     "pid        logs/nginx.pid;"     这句前面的#去掉￼2.执行以下命令￼  systemctl daemon-reload￼3.再次尝试启动服务￼')]),s(`
`),n("span",{class:"line"},[n("span",null,"\\> 来自")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null," \\<https://www.jianshu.com/p/7c5c778f5ffe\\>")])])])])],-1)])])}const f=e(t,[["render",c]]);export{x as __pageData,f as default};
