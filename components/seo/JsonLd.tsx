/** 结构化数据：服务端渲染的 JSON-LD，确定性输出，无 hydration 风险；支持单个对象或 @graph 数组 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
