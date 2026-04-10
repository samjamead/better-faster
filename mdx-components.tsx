import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import Link from "next/link";

import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

type ImageProps = React.ComponentPropsWithoutRef<"img">;
type ImageElement = ReactElement<ImageProps, typeof MDXImage>;

type MDXImageComponent = ((props: ImageProps) => React.JSX.Element) & {
  displayName?: string;
};

export const MDXImage: MDXImageComponent = ({
  alt = "",
  className,
  ...props
}: ImageProps) => {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className={cn("h-auto w-full", className)}
        loading="lazy"
        {...props}
      />
    </>
  );
};

MDXImage.displayName = "MDXImage";

type MDXImageFrameProps = {
  image: ImageElement;
};

function MDXImageCaption({ alt }: { alt?: string }) {
  if (!alt) {
    return null;
  }

  return <p className="text-muted-foreground mt-3 text-sm">{alt}</p>;
}

export function MDXImageFrame({ image }: MDXImageFrameProps) {
  return (
    <div className="my-10 rounded border p-4">
      {image}
      <MDXImageCaption alt={image.props.alt} />
    </div>
  );
}

MDXImageFrame.displayName = "MDXImageFrame";

type MDXImageGalleryProps = {
  images: ImageElement[];
};

export function MDXImageGallery({ images }: MDXImageGalleryProps) {
  return (
    <div className="my-10 rounded border p-4">
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <div key={image.key ?? `mdx-image-${index}`}>
            <div className="aspect-5/7 overflow-hidden rounded">
              {cloneElement(image, {
                className: cn(
                  "h-full w-full object-cover",
                  image.props.className,
                ),
              })}
            </div>
            <MDXImageCaption alt={image.props.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

MDXImageGallery.displayName = "MDXImageGallery";

function isMDXImageElement(node: ReactNode): node is ImageElement {
  return isValidElement(node) && node.type === MDXImage;
}

function isWhitespaceNode(node: ReactNode) {
  return typeof node === "string" && node.trim().length === 0;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn("text-4xl font-semibold tracking-tight", className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn("mt-10 text-2xl font-semibold tracking-tight", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn("mt-8 text-xl font-semibold", className)} {...props} />
    ),
    p: ({ children, className, ...props }) => {
      const childArray = Children.toArray(children).filter(
        (child) => !isWhitespaceNode(child),
      );
      const imageChildren = childArray.filter(isMDXImageElement);
      const isImageOnlyParagraph =
        childArray.length > 0 && imageChildren.length === childArray.length;

      if (isImageOnlyParagraph) {
        if (imageChildren.length === 1) {
          return <MDXImageFrame image={imageChildren[0]} />;
        }

        return <MDXImageGallery images={imageChildren} />;
      }

      return (
        <p
          className={cn(
            "text-muted-foreground leading-7 not-first:mt-6",
            className,
          )}
          {...props}
        >
          {children}
        </p>
      );
    },
    a: ({ className, href = "", ...props }) => {
      const isInternal = href.startsWith("/");

      if (isInternal) {
        return (
          <Link
            href={href}
            className={cn(
              "text-foreground underline decoration-1 underline-offset-4",
              className,
            )}
            {...props}
          />
        );
      }

      return (
        <a
          href={href}
          className={cn(
            "text-foreground underline decoration-1 underline-offset-4",
            className,
          )}
          rel="noreferrer"
          target="_blank"
          {...props}
        />
      );
    },
    ul: ({ className, ...props }) => (
      <ul
        className={cn("mt-6 list-disc space-y-2 pl-6", className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn("mt-6 list-decimal space-y-2 pl-6", className)}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("text-muted-foreground", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "text-muted-foreground border-l-2 pl-6 italic",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "bg-muted rounded px-1.5 py-0.5 font-mono text-[0.9em]",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "bg-muted mt-6 overflow-x-auto rounded-lg border p-4 text-sm",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("border-border my-10", className)} {...props} />
    ),
    img: MDXImage,
    ...components,
  };
}
