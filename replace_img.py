import os
import re

src_dir = r"c:\sweetsoft\projects\astro\project-is-me\src"
safe_image_path = r"c:\sweetsoft\projects\astro\project-is-me\src\components\SafeImage.astro"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if filepath == safe_image_path:
        return

    if not re.search(r'<\s*img\b', content):
        return

    print(f"Processing {filepath}")

    content = re.sub(r'<\s*img\b', '<SafeImage', content)
    content = re.sub(r'</\s*img\s*>', '</SafeImage>', content)

    rel_path = os.path.relpath(safe_image_path, os.path.dirname(filepath)).replace("\\", "/")
    if not rel_path.startswith("."):
        rel_path = "./" + rel_path
    
    import_statement = f'import SafeImage from "{rel_path}";\n'

    if content.startswith('---'):
        idx = content.find('\n', 3)
        if idx != -1:
            content = content[:idx+1] + import_statement + content[idx+1:]
    else:
        content = f"---\n{import_statement}---\n\n" + content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.astro'):
            process_file(os.path.join(root, file))

print("Done")
