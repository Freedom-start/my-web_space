import { getAllPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import BlogRow from "./BlogRow";

/** Editorial / Knowledge Archive：服务端读取内容目录，行级动画在 BlogRow（client）中 */
export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Blog / 03"
        title="Knowledge archive"
        accent={["archive"]}
        description="写作是最好的思考方式。这里存放着学习过程中的推导、复盘与沉淀。"
      />

      <div className="mt-14 flex flex-col">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <BlogRow post={post} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
