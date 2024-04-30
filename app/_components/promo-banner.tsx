import Image from "next/image";

const PromoBanner = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      className="h-auto w-full object-contain pt-6"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
