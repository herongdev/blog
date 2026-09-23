import{_ as n,o as e,c as s,a5 as t}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"30. Practice: Manual Memory Management","description":"The Little Book of C — 30. Practice: Manual Memory Management","frontmatter":{"title":"30. Practice: Manual Memory Management","date":"2026-07-04","categories":"[C 教程]","tags":"[C, Little Book of C, Working with Memory]","description":"The Little Book of C — 30. Practice: Manual Memory Management","source":"https://little-book-of.github.io/c/books/en-US/book.html","license":"CC BY-NC-SA 4.0","originalAuthor":"Duc-Tam Nguyen","section":"30","sidebarWeight":"30","lang":"en-US","alternateEn":"/posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management","alternateZh":"/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management"},"headers":[],"relativePath":"posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management.md","filePath":"posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management.md","lastUpdated":1790163617000}'),l={name:"posts/c教程/en-US/03-Working with Memory/030-Practice Manual Memory Management.md"};function p(o,a,i,r,c,d){return e(),s("div",null,[...a[0]||(a[0]=[t(`<p>[中文版本](/posts/c教程/zh-CN/03-内存/030-Practice Manual Memory Management)</p><h4 id="follow-along-deliverable" tabindex="-1">Follow-Along Deliverable <a class="header-anchor" href="#follow-along-deliverable" aria-label="Permalink to &quot;Follow-Along Deliverable&quot;">​</a></h4><ul><li>Assumed state: lessons 021-029 are complete and you can rebuild the previous example.</li><li>Working directory: <code>~/c-course-labs/030-memory</code>.</li><li>First command: on macOS / Linux run <code>mkdir -p ~/c-course-labs/030-memory &amp;&amp; cd ~/c-course-labs/030-memory</code>; on Windows PowerShell run <code>New-Item -ItemType Directory -Force &quot;$HOME\\c-course-labs\\030-memory&quot;; Set-Location &quot;$HOME\\c-course-labs\\030-memory&quot;</code>.</li><li>Success evidence: keep the source file, executable, <code>evidence.md</code>, and record program output, one ownership note, and a Valgrind or AddressSanitizer record.</li><li>Boundary for this lab: This lab focuses on ownership and release paths. A general-purpose allocator is out of scope until lesson 95.</li><li>Reset: remove the executable, temporary data, and generated output for this lab; keep source and <code>evidence.md</code> for review.</li></ul><p>Now that you’ve learned how memory works, stack vs heap, allocation, freeing, leaks, deep vs shallow copies, it’s time to practice controlling memory manually. This exercise ties together<code>malloc</code>,<code>free</code>, pointers, and struct management in a real, runnable program.</p><p>You’ll build a small system that stores and manipulates dynamically allocated records, a tiny simulation of how databases or object systems manage memory in C.</p><h4 id="goal" tabindex="-1">Goal <a class="header-anchor" href="#goal" aria-label="Permalink to &quot;Goal&quot;">​</a></h4><p>Create a simple “student record manager” that can:</p><ul><li>Dynamically allocate memory for each student’s name.</li><li>Store and print student data.</li><li>Free all allocated memory cleanly at the end.</li></ul><h4 id="tiny-code" tabindex="-1">Tiny Code <a class="header-anchor" href="#tiny-code" aria-label="Permalink to &quot;Tiny Code&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    char *name;</span></span>
<span class="line"><span>    int age;</span></span>
<span class="line"><span>    float gpa;</span></span>
<span class="line"><span>} Student;</span></span>
<span class="line"><span>Student *create_student(const char *name, int age, float gpa) {</span></span>
<span class="line"><span>    Student *s = malloc(sizeof(Student));</span></span>
<span class="line"><span>    if (!s) {</span></span>
<span class="line"><span>        printf(&quot;Memory allocation failed for Student.\\n&quot;);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    s-&gt;name = malloc(strlen(name) + 1);</span></span>
<span class="line"><span>    if (!s-&gt;name) {</span></span>
<span class="line"><span>        printf(&quot;Memory allocation failed for name.\\n&quot;);</span></span>
<span class="line"><span>        free(s);</span></span>
<span class="line"><span>        exit(1);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    strcpy(s-&gt;name, name);</span></span>
<span class="line"><span>    s-&gt;age = age;</span></span>
<span class="line"><span>    s-&gt;gpa = gpa;</span></span>
<span class="line"><span>    return s;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void print_student(const Student *s) {</span></span>
<span class="line"><span>    printf(&quot;Name: %-10s | Age: %d | GPA: %.2f\\n&quot;, s-&gt;name, s-&gt;age, s-&gt;gpa);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void free_student(Student *s) {</span></span>
<span class="line"><span>    free(s-&gt;name);</span></span>
<span class="line"><span>    free(s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main(void) {</span></span>
<span class="line"><span>    printf(&quot;=== Manual Memory Management Demo ===\\n&quot;);</span></span>
<span class="line"><span>    // Create three students dynamically</span></span>
<span class="line"><span>    Student *a = create_student(&quot;Alice&quot;, 20, 3.8f);</span></span>
<span class="line"><span>    Student *b = create_student(&quot;Bob&quot;, 22, 3.4f);</span></span>
<span class="line"><span>    Student *c = create_student(&quot;Carol&quot;, 19, 3.9f);</span></span>
<span class="line"><span>    // Print their details</span></span>
<span class="line"><span>    print_student(a);</span></span>
<span class="line"><span>    print_student(b);</span></span>
<span class="line"><span>    print_student(c);</span></span>
<span class="line"><span>    // Modify dynamically allocated memory</span></span>
<span class="line"><span>    char new_name[] = &quot;Bobby&quot;;</span></span>
<span class="line"><span>    b-&gt;name = realloc(b-&gt;name, strlen(new_name) + 1);</span></span>
<span class="line"><span>    strcpy(b-&gt;name, new_name);</span></span>
<span class="line"><span>    b-&gt;gpa = 3.6f;</span></span>
<span class="line"><span>    printf(&quot;\\nAfter update:\\n&quot;);</span></span>
<span class="line"><span>    print_student(b);</span></span>
<span class="line"><span>    // Free memory</span></span>
<span class="line"><span>    free_student(a);</span></span>
<span class="line"><span>    free_student(b);</span></span>
<span class="line"><span>    free_student(c);</span></span>
<span class="line"><span>    printf(&quot;\\nAll memory released.\\n&quot;);</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Compile and run:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc manual_memory.c -o manual_memory</span></span>
<span class="line"><span>./manual_memory</span></span></code></pre></div><p>Output:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>=== Manual Memory Management Demo ===</span></span>
<span class="line"><span>Name: Alice      | Age: 20 | GPA: 3.80</span></span>
<span class="line"><span>Name: Bob        | Age: 22 | GPA: 3.40</span></span>
<span class="line"><span>Name: Carol      | Age: 19 | GPA: 3.90</span></span>
<span class="line"><span></span></span>
<span class="line"><span>After update:</span></span>
<span class="line"><span>Name: Bobby      | Age: 22 | GPA: 3.60</span></span>
<span class="line"><span></span></span>
<span class="line"><span>All memory released.</span></span></code></pre></div><h4 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h4><p>Dynamic Allocation: Each<code>Student</code> and its<code>name</code> field are created on the heap with<code>malloc()</code>. You control exactly when they exist and when to destroy them.</p><p>Ownership:</p><ul><li>The program owns each student’s memory.</li><li>Each<code>create_student()</code> call must later be matched by<code>free_student()</code>.</li></ul><p>Memory Safety:</p><ul><li>Every<code>malloc</code> result is checked.</li><li>Freed memory is properly released before exit.</li></ul><h4 id="expanding-the-example" tabindex="-1">Expanding the Example <a class="header-anchor" href="#expanding-the-example" aria-label="Permalink to &quot;Expanding the Example&quot;">​</a></h4><p>Try these modifications:</p><p>Dynamic Array of Students</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Student **students = malloc(3 * sizeof(Student *));</span></span>
<span class="line"><span>students[0] = create_student(&quot;Ava&quot;, 21, 3.7f);</span></span>
<span class="line"><span>students[1] = create_student(&quot;Ben&quot;, 20, 3.5f);</span></span>
<span class="line"><span>students[2] = create_student(&quot;Cleo&quot;, 23, 3.9f);</span></span></code></pre></div><p>Iterate through them and print all details, then free each one.</p><p>Reallocation (grow list) Use<code>realloc()</code> to increase your array’s capacity when adding more students dynamically.</p><p>Deep Copy Function Implement:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Student *copy_student(const Student *src);</span></span></code></pre></div><p>which performs a deep copy by allocating new memory for both the struct and its name.</p><p>Leak Detection Run your program with<code>valgrind ./manual_memory</code>, confirm that all memory is freed cleanly.</p><h4 id="why-it-matters" tabindex="-1">Why It Matters <a class="header-anchor" href="#why-it-matters" aria-label="Permalink to &quot;Why It Matters&quot;">​</a></h4><p>This small example mirrors what real C systems do:</p><ul><li>Allocate complex data on demand.</li><li>Manage lifetime explicitly.</li><li>Clean up correctly.</li></ul><p>Everything from operating systems to databases and compilers depends on this discipline. Once you can manage small dynamic structures like this confidently, you’re ready to build larger systems safely, from allocators to object pools to file caches.</p><h4 id="try-it-yourself" tabindex="-1">Try It Yourself <a class="header-anchor" href="#try-it-yourself" aria-label="Permalink to &quot;Try It Yourself&quot;">​</a></h4><ol><li>Add a new field (<code>major</code>) and handle it dynamically.</li><li>Add an array of grades and compute averages.</li><li>Convert your static list into a dynamically resizable array using<code>realloc</code>.</li><li>Intentionally omit a<code>free()</code> call, then detect the leak with Valgrind.</li><li>Write a<code>destroy_all()</code> function that frees an array of students safely.</li></ol><p>You’ve now completed Chapter 3: Working with Memory. You understand how data lives, moves, and disappears in C, and you’ve practiced taking full control over it. From here, you’ll learn how to structure that data elegantly using<code>struct</code>,<code>union</code>, and real-world data abstractions in Chapter 4.</p>`,37)])])}const h=n(l,[["render",p]]);export{m as __pageData,h as default};
