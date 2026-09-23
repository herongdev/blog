import{_ as o,o as c,c as t,a5 as d}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"详解各个对象","description":"","frontmatter":{"title":"详解各个对象","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","数据库","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第五部分：数据库/01-JDBC/详解各个对象.md","filePath":"posts/java快速入门/第五部分：数据库/01-JDBC/详解各个对象.md"}'),n={name:"posts/java快速入门/第五部分：数据库/01-JDBC/详解各个对象.md"};function l(r,e,i,a,p,s){return c(),t("div",null,[...e[0]||(e[0]=[d(`<div><p><code>DriverManager</code>：驱动管理对象 功能： <code>1.</code> 注册驱动：告诉程序该使用哪一个数据库驱动</p><p>jar static void registerDriver(Driver driver) : 注册与给定的驱动程序 <code>DriverManager</code> 。 写代码使用： <code>Class.forName(&quot;com.mysql.jdbc.Driver&quot;);</code> 通过查看源码发现：在<code>com.mysql.jdbc.Driver</code>类中存在静态代码块</p><p>static { try { java.sql.DriverManager.registerDriver(new Driver()); } catch (SQLException E) { throw new RuntimeException(&quot;Can&#39;t register driver!&quot;); } } 注意：<code>mysql5</code>之后的驱动<code>jar</code>包可以省略注册驱动的步骤。 <code>2.</code> 获取数据库连接： <code>*</code> 方法：</p><p>static Connection getConnection(String url, String user, String password) * 参数： <code>* url</code>：指定连接的路径 <code>*</code> 语法：<code>jdbc:mysql://ip</code>地址<code>(</code>域名<code>):</code>端口号<code>/</code>数据库名称 <code>*</code> 例子：</p><p>jdbc:mysql://localhost:3306/db3 * 细节：如果连接的是本机<code>mysql</code>服务器，并且<code>mysql</code>服务默认端口是<code>3306</code>，则<code>url</code>可以简写为：<code>jdbc:mysql:///</code>数据库名称 <code>* user</code>：用户名 <code>* password</code>：密码</p><p><code>Connection</code><strong>：数据库连接对象</strong> 功能： <code>1.</code> 获取执行<code>sql</code> 的对象</p><ul><li><ul><li>Statement createStatement()</li></ul></li><li><ul><li>PreparedStatement prepareStatement(String sql)</li></ul></li><li><ol start="2"><li></li></ol></li></ul><p>管理事务： <code>*</code> 开启事务：<code>setAutoCommit(boolean autoCommit)</code> ：调用该方法设置参数为<code>false</code>，即开启事务 <code>*</code> 提交事务：</p><ul><li>commit()</li><li><ul><li></li></ul></li></ul><p>回滚事务：<code>rollback()</code></p><p><code>Statement</code>：执行<code>sql</code>的对象 <code>1.</code> 执行</p><ul><li>sql</li><li><ol><li>boolean execute(String sql)</li></ol></li></ul><p>：可以执行任意的<code>sql</code> 了解</p><p><code>2. int executeUpdate(String sql)</code></p><p>：执行<code>DML</code>（<code>insert</code>、<code>update</code>、<code>delete</code>）语句、<code>DDL(create</code>，<code>alter</code>、<code>drop)</code>语句 <code>*</code> 返回值：影响的行数，可以通过这个影响的行数判断<code>DML</code>语句是否执行成功 返回值<code>\\&gt;0</code>的则执行成功，反之，则失败。 <code>3. ResultSet executeQuery(String sql)</code> ：执行<code>DQL</code>（<code>select)</code>语句 <code>2.</code> 练习： <code>1. account</code>表 添加一条记录 <code>2. account</code>表 修改记录 <code>3. account</code>表 删除一条记录 代码：</p><p>Statement stmt = null; Connection conn = null; try { //1. 注册驱动</p><pre><code>        Class.forName(&quot;com.mysql.jdbc.Driver&quot;);
        //2.
</code></pre><p>定义</p><ul><li>sql</li><li>String sql = &quot;insert into account values(null,&#39;</li></ul><p>王五</p><p>&#39;,3000)&quot;; //3. 获取<code>Connection</code>对象</p><pre><code>        conn = DriverManager.getConnection(&quot;jdbc:mysql:///db3&quot;, &quot;root&quot;, &quot;root&quot;);
        //4.
</code></pre><p>获取执行<code>sql</code>的对象</p><p>Statement stmt = conn.createStatement(); //5. 执行</p><p>sql int count = stmt.executeUpdate(sql);// 影响的行数 <code>//6.</code>处理结果</p><pre><code>        System.out.println(count);
        if(count \\&gt; 0)\\{
            System.out.println(&quot;
</code></pre><p>添加成功！</p><p>&quot;); }else{ System.out.println(&quot; 添加失败！</p><p>&quot;); }</p><pre><code>    \\} catch (ClassNotFoundException e) \\{
        e.printStackTrace();
    \\} catch (SQLException e) \\{
        e.printStackTrace();
    \\}finally \\{
        //stmt.close();
        //7.
</code></pre><p>释放资源 <code>//</code>避免空指针异常</p><pre><code>        if(stmt != null)\\{
            try \\{
                stmt.close();
            \\} catch (SQLException e) \\{
                e.printStackTrace();
            \\}
        \\}

        if(conn != null)\\{
            try \\{
                conn.close();
            \\} catch (SQLException e) \\{
                e.printStackTrace();
            \\}
        \\}
    \\}
</code></pre><p><code>ResultSet</code>：结果集对象，封装查询结果</p><p><code>* boolean next():</code> 游标向下移动一行，判断当前行是否是最后一行末尾<code>(</code>是否有数据<code>)</code>，如果是，则返回<code>false</code>，如果不是则返回</p><ul><li>true</li><li><ul><li>getXxx(</li></ul></li></ul><p>参数<code>)</code>获取数据：<code>Xxx</code>：代表数据类型，如： <code>int getInt() ,String getString()</code></p><p>java.sql.Date、Time、Timestamp(时间戳)，三个共同父类是：java.util.Date</p><p><code>*</code> 注意： <code>*</code> 使用步骤： <code>1.</code> 游标向下移动一行 <code>2.</code> 判断是否有数据 <code>3.</code> 获取数据 <code>//</code>循环判断游标是否是最后一行末尾。</p><pre><code>        while(rs.next())\\{
            //
</code></pre><p>获取数据 <code>//6.2</code> 获取数据</p><pre><code>            int id = rs.getInt(1);
            String name = rs.getString(&quot;name&quot;);
            double balance = rs.getDouble(3);

            System.out.println(id + &quot;---&quot; + name + &quot;---&quot; + balance);
        \\}
</code></pre><ul><li></li></ul><p>练习：查询所有的学生信息</p></div>`,1)])])}const q=o(n,[["render",l]]);export{m as __pageData,q as default};
