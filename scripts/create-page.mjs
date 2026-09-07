import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'src', 'pages');

function slugify(text) {
  return text
    .toString()
    .normalize('NFD') // Tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
    .replace(/[\s_]+/g, '-') // Thay khoảng trắng/gạch dưới thành dấu gạch ngang
    .replace(/^-+|-+$/g, ''); // Xóa dấu gạch ngang ở đầu/cuối
}

function toTitleCase(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createPage(folderName) {
  const slug = slugify(folderName);

  if (!slug) {
    console.error('❌ Tên folder không hợp lệ!');
    process.exit(1);
  }

  const targetDir = path.join(pagesDir, slug);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Thư mục "src/pages/${slug}" đã tồn tại! Vui lòng chọn tên khác.`);
    process.exit(1);
  }

  const titleName = toTitleCase(slug);

  // 1. Tạo các thư mục con theo cấu trúc chuẩn dự án
  const assetsDir = path.join(targetDir, '_assets');
  const componentsDir = path.join(targetDir, '_components');
  const stylesDir = path.join(targetDir, '_styles');

  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(componentsDir, { recursive: true });
  fs.mkdirSync(stylesDir, { recursive: true });

  // Giữ folder rỗng trong git nếu cần
  fs.writeFileSync(path.join(assetsDir, '.gitkeep'), '');
  fs.writeFileSync(path.join(stylesDir, '.gitkeep'), '');

  // 2. Tạo _components/Layout.astro
  const layoutContent = `---
import Layout from '../../../layouts/Layout.astro';

interface Props {
  title: string;
  desc?: string;
}

const { title, desc } = Astro.props;
---

<Layout title={title} description={desc}>
  <slot name="head" slot="head" />

  <main transition:animate="fade" class="font-sans min-h-screen">
    <slot />
  </main>
</Layout>
`;
  fs.writeFileSync(path.join(componentsDir, 'Layout.astro'), layoutContent.trim() + '\n', 'utf-8');

  // 3. Tạo index.astro
  const indexContent = `---
import Layout from "./_components/Layout.astro";
---

<Layout
  title="${titleName}"
  desc="Trang chủ cho ${titleName}"
>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
      ${titleName}
    </h1>
    <p class="text-slate-400 text-base">
      Trang dự án mới được tạo tại <code>src/pages/${slug}/index.astro</code>.
    </p>
  </div>
</Layout>
`;
  fs.writeFileSync(path.join(targetDir, 'index.astro'), indexContent.trim() + '\n', 'utf-8');

  console.log('\n✅ Khởi tạo trang mới thành công!\n');
  console.log(`📁 Đường dẫn: src/pages/${slug}/`);
  console.log(`   ├── _assets/`);
  console.log(`   ├── _components/`);
  console.log(`   │   └── Layout.astro`);
  console.log(`   ├── _styles/`);
  console.log(`   └── index.astro\n`);
  console.log(`🔗 URL xem trước: http://localhost:4321/${slug}\n`);
}

// Kiểm tra tham số truyền từ dòng lệnh hoặc hỏi trực tiếp
const args = process.argv.slice(2);
const folderArg = args[0];

if (folderArg) {
  createPage(folderArg);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Nhập tên folder / project muốn tạo vào pages: ', (answer) => {
    rl.close();
    createPage(answer);
  });
}
