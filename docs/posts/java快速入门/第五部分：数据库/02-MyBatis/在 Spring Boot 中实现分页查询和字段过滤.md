---
title: 在 Spring Boot 中实现分页查询和字段过滤
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
**1. 引入依赖**
首先，确保项目中已经引入了 MyBatis-Plus 和 Spring Boot 相关依赖：
\<dependency\>
\<groupId\>com.baomidou\</groupId\>
\<artifactId\>mybatis-plus-boot-starter\</artifactId\>
\<version\>3.4.3.4\</version\>
\</dependency\>

**2. 创建分页和过滤的查询接口**
以 BusinessService 为例，我们创建一个分页查询接口方法：
public interface BusinessService\<T\> extends IService\<T\> {
IPage\<T\> listPage(IPage\<T\> page, Wrapper\<T\> queryWrapper);
}
这个接口方法定义了分页查询逻辑，接收 IPage\<T\>（分页对象）和 Wrapper\<T\>（查询条件）作为参数。

**3. 编写分页和字段过滤的控制器方法**
假设我们有一个 MonitorModelController，其中的 list 方法提供分页和关键字过滤的功能。
@RestController
@RequestMapping("/monitor")
public class MonitorModelController {
@Autowired
private MonitorModelService monitorModelService;

@ApiOperation("查询列表")
@GetMapping("/list")
public R\<PageResult\<MonitorModelVO\>\> list(
@RequestParam(value = "pageNum", defaultValue = "1") Long pageNum,
@RequestParam(value = "pageSize", defaultValue = "10") Long pageSize,
@RequestParam(value = "keyword", required = false) String keyword) {
// 1. 创建分页对象
Page\<MonitorModel\> pageRequest = new Page\<\>(pageNum, pageSize);
// 2. 构造查询条件
QueryWrapper\<MonitorModel\> queryWrapper = new QueryWrapper\<\>();
if (StringUtils.isNotBlank(keyword)) {
queryWrapper.lambda().like(MonitorModel::getName, keyword); // 假设需要查询的字段是 `name`
}
// 3. 执行分页查询
Page\<MonitorModel\> page = monitorModelService.page(pageRequest, queryWrapper);
// 4. 数据转换
List\<MonitorModelVO\> results = page.getRecords().stream().map(record -\> {
MonitorModelVO vo = new MonitorModelVO();
BeanUtils.copyProperties(record, vo);
// 假设有其他信息需要填充，如关联的站点名称
vo.setSiteNames(siteManagerService.getSiteNames(record.getSiteId()));
return vo;
}).collect(Collectors.toList());
// 5. 返回结果
return R.ok(new PageResult\<\>(page.getTotal(), results));
}
}

**4. 代码解释**

1. **分页对象**：使用 Page\<MonitorModel\> 创建分页请求对象 pageRequest，并设置当前页码和每页显示条数。
2. **QueryWrapper**：使用 QueryWrapper 构造查询条件。如果前端传递了关键字 keyword，则对指定字段（如 name 字段）应用模糊查询。
3. **分页查询**：调用 monitorModelService.page(pageRequest, queryWrapper) 方法，将分页对象和查询条件一并传递，获取分页数据。
4. **数据转换**：将查询结果转换为目标 VO（值对象）列表。可以根据业务需求在此阶段填充其他字段（如关联字段）。
5. **返回结果**：将分页总数和转换后的数据列表封装成 PageResult，并返回到前端。

**5. 扩展：多字段过滤**
如果需要添加更多的字段过滤条件，可以继续在 QueryWrapper 中添加其他条件：
if(StringUtils.isNotBlank(keyword)) {￼ queryWrapper.lambda().like(MonitorModel::getName, keyword);￼}￼if(StringUtils.isNotBlank(status)) {￼ queryWrapper.lambda().eq(MonitorModel::getStatus, status); // 例如状态字段过滤}￼
**6. 实现自定义返回结果类 PageResult**
PageResult 可以自定义一个类，用于返回分页数据，包含总记录数和当前页的数据列表：
public class PageResult\<T\> {
private Long total;
private List\<T\> records;
public PageResult(Long total, List\<T\> records) {
this.total = total;
this.records = records;
}
// Getter and Setter
}

**7. 封装响应对象 R**
R 类通常用于统一API响应格式，可以定义为通用的响应格式类：
public class R\<T\> {
private Integer code;
private String message;
private T data;
public static \<T\> R\<T\> ok(T data) {
return new R\<\>(200, "Success", data);
}
public R(Integer code, String message, T data) {
this.code = code;
this.message = message;
this.data = data;
}
// Getter and Setter
}

**总结**

1. **分页和过滤查询**：通过 MyBatis-Plus 的 Page 对象和 QueryWrapper 构造分页和条件查询。
2. **构建查询条件**：可以使用 QueryWrapper 灵活地添加多字段的过滤条件，实现模糊查询或精确查询。
3. **结果封装**：将结果转换为特定的 VO，并使用 PageResult 和 R 类统一返回结构。
