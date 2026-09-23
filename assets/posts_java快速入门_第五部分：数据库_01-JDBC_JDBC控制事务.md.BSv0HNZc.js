import{_ as t,o as a,c as o,j as l,a as n}from"./chunks/framework.DJo0M80U.js";const C=JSON.parse('{"title":"JDBC控制事务","description":"","frontmatter":{"title":"JDBC控制事务","date":"2026-07-03T00:00:00.000Z","categories":["Java 快速入门"],"tags":["Java","数据库","OneNote"],"lastUpdated":false},"headers":[],"relativePath":"posts/java快速入门/第五部分：数据库/01-JDBC/JDBC控制事务.md","filePath":"posts/java快速入门/第五部分：数据库/01-JDBC/JDBC控制事务.md"}'),u={name:"posts/java快速入门/第五部分：数据库/01-JDBC/JDBC控制事务.md"};function c(s,e,p,r,i,d){return a(),o("div",null,[...e[0]||(e[0]=[l("div",null,[l("p",null,[l("code",null,"1."),n(" 事务：一个包含多个步骤的业务操作。如果这个业务操作被事务管理，则这多个步骤要么同时成功，要么同时失败。 "),l("code",null,"2."),n(" 操作： "),l("code",null,"1."),n(" 开启事务 "),l("code",null,"2."),n(" 提交事务 "),l("code",null,"3."),n(" 回滚事务 "),l("code",null,"3."),n(" 使用"),l("code",null,"Connection"),n("对象来管理事务 "),l("code",null,"*"),n(" 开启事务："),l("code",null,"setAutoCommit(boolean autoCommit)"),n(" ：调用该方法设置参数为"),l("code",null,"false"),n("，即开启事务 "),l("code",null,"*"),n(" 在执行"),l("code",null,"sql"),n("之前开启事务 "),l("code",null,"*"),n(" 提交事务：")]),l("ul",null,[l("li",null,"commit()"),l("li",null,[l("ul",null,[l("li")])])]),l("p",null,[n("当所有"),l("code",null,"sql"),n("都执行完提交事务 "),l("code",null,"*"),n(" 回滚事务：")]),l("ul",null,[l("li",null,"rollback()"),l("li",null,[l("ul",null,[l("li")])])]),l("p",null,[n("在"),l("code",null,"catch"),n("中回滚事务")]),l("p",null,[l("code",null,"4."),n(" 代码： "),l("code",null,"public class JDBCDemo10 {")]),l("pre",null,[l("code",null,`public static void main(String[] args) \\{
    Connection conn = null;
    PreparedStatement pstmt1 = null;
    PreparedStatement pstmt2 = null;

    try \\{
        //1.
`)]),l("p",null,"获取连接"),l("pre",null,[l("code",null,`        conn = JDBCUtils.getConnection();
        //
`)]),l("p",null,[n("开启事务 "),l("code",null,"conn.setAutoCommit(false);")]),l("p",null,[l("code",null,"//2."),n("定义")]),l("p",null,[n("sql "),l("a",{href:"//2.1",target:"_blank",rel:"noreferrer"},"//2.1"),n(" 张三")]),l("ul",null,[l("li",null,[n('500 String sql1 = "update account set balance = balance - ? where id = ?"; '),l("a",{href:"//2.2",target:"_blank",rel:"noreferrer"},"//2.2"),n(" 李四")])]),l("ul",null,[l("li",null,[l("p",null,[n('500 String sql2 = "update account set balance = balance + ? where id = ?"; //3. 获取执行'),l("code",null,"sql"),n("对象")]),l("pre",null,[l("code",null,`     pstmt1 = conn.prepareStatement(sql1);
     pstmt2 = conn.prepareStatement(sql2);
     //4.
`)])])]),l("p",null,"设置参数"),l("pre",null,[l("code",null,`        pstmt1.setDouble(1,500);
        pstmt1.setInt(2,1);

        pstmt2.setDouble(1,500);
        pstmt2.setInt(2,2);
        //5.
`)]),l("p",null,"执行"),l("p",null,[n("sql pstmt1.executeUpdate(); // 手动制造异常 "),l("code",null,"int i = 3/0;")]),l("pre",null,[l("code",null,`        pstmt2.executeUpdate();
        //
`)]),l("p",null,"提交事务"),l("pre",null,[l("code",null,`        conn.commit();
    \\} catch (Exception e) \\{
        //
`)]),l("p",null,"事务回滚"),l("pre",null,[l("code",null,`        try \\{
            if(conn != null) \\{
                conn.rollback();
            \\}
        \\} catch (SQLException e1) \\{
            e1.printStackTrace();
        \\}
        e.printStackTrace();
    \\}finally \\{
        JDBCUtils.close(pstmt1,conn);
        JDBCUtils.close(pstmt2,null);
    \\}

\\}
`)]),l("p",null,"}"),l("div",{class:"language- vp-adaptive-theme"},[l("button",{title:"Copy Code",class:"copy"}),l("span",{class:"lang"}),l("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[l("code",null,[l("span",{class:"line"},[l("span")])])])])],-1)])])}const b=t(u,[["render",c]]);export{C as __pageData,b as default};
