const fs = require('fs/promises');
const path = require('path');

/**
 * Đọc nội dung file Markdown từ thư mục public.
 * @param {string} relativeFilePath - Đường dẫn tương đối của file (ví dụ: 'posts/bai-viet-1.md').
 * @returns {Promise<string>} Nội dung file dưới dạng chuỗi 'utf8'.
 */
export async function readMarkdownFile(relativeFilePath: string) {
    // Tạo đường dẫn tuyệt đối đến file
    // Giả sử thư mục 'public' nằm ở gốc dự án.
    const fullPath = path.join(
        process.cwd(), // Lấy thư mục làm việc hiện tại (gốc dự án)
        'public',
        relativeFilePath
    );

    try {
        // Đọc nội dung file một cách bất đồng bộ
        const content = await fs.readFile(fullPath, { encoding: 'utf8' });
        return content;
    } catch (error: any) {
        // Xử lý lỗi nếu file không tồn tại hoặc không thể đọc được
        console.error(`Lỗi khi đọc file ${relativeFilePath}:`, error.message);
        // Có thể throw lại lỗi hoặc trả về null/chuỗi rỗng tùy mục đích
        throw new Error(`Không thể đọc file: ${relativeFilePath}`);
    }
}