import { BannerBlock } from '@/blocks/Banner/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import React, { Fragment, JSX } from 'react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import styles from '@/styles/ArticlesPage.module.scss'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { CMSLink } from '../Link';

export type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | BannerBlockProps>

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes, isInsideHeading = false }: Props & { isInsideHeading?: boolean }): JSX.Element {
    return (
      <Fragment>
        {nodes?.map((node, index): JSX.Element | null => {
          if (node == null) {
            return null;
          }
  
          if (node.type === 'text') {
            if (isInsideHeading) {
              return <React.Fragment key={index}>{node.text}</React.Fragment>;
            }
  
            let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
            if (node.format & IS_BOLD) {
              text = <strong key={index}>{text}</strong>;
            }
            if (node.format & IS_ITALIC) {
              text = <em key={index}>{text}</em>;
            }
            if (node.format & IS_STRIKETHROUGH) {
              text = (
                <span key={index} style={{ textDecoration: 'line-through' }}>
                  {text}
                </span>
              );
            }
            if (node.format & IS_UNDERLINE) {
              text = (
                <span key={index} style={{ textDecoration: 'underline' }}>
                  {text}
                </span>
              );
            }
            if (node.format & IS_CODE) {
              text = <code key={index}>{node.text}</code>;
            }
            if (node.format & IS_SUBSCRIPT) {
              text = <sub key={index}>{text}</sub>;
            }
            if (node.format & IS_SUPERSCRIPT) {
              text = <sup key={index}>{text}</sup>;
            }
  
            return text;
          }
  
          const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
            if (!node.children) {
              return null;
            }
            return serializeLexical({
              nodes: node.children as NodeTypes[],
              isInsideHeading,
            });
          };
  
          const serializedChildren = 'children' in node ? serializedChildrenFn(node) : '';
  
          if (node.type === 'block') {
            const block = node.fields;
            const blockType = block?.blockType;
  
            if (!block || !blockType) {
              return null;
            }
  
            switch (blockType) {
              case 'mediaBlock':
                return (
                  <MediaBlock
                    key={index}
                    {...block}
                    enableGutter={false}
                    disableInnerContainer={true}
                  />
                );
              case 'banner':
                return <BannerBlock key={index} {...block} />;
              default:
                return null;
            }
          } else {
            switch (node.type) {
              case 'linebreak': {
                return <br key={index} />;
              }
              case 'paragraph': {
                return <p key={index}>{serializedChildren}</p>;
              }
              case 'heading': {
                const Tag = node?.tag;
                return (
                  <Tag key={index}>
                    <span className={styles.rectangleHeadline}></span>
                    {serializeLexical({
                      nodes: node.children as NodeTypes[],
                      isInsideHeading: true,
                    })}
                  </Tag>
                );
              }
              case 'list': {
                const Tag = node?.tag;
                return <Tag key={index}>{serializedChildren}</Tag>;
              }
              case 'listitem': {
                if (node?.checked != null) {
                  return (
                    <li
                      aria-checked={node.checked ? 'true' : 'false'}
                      key={index}
                      role="checkbox"
                      tabIndex={-1}
                      value={node?.value}
                    >
                      {serializedChildren}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} value={node?.value}>
                      {serializedChildren}
                    </li>
                  );
                }
              }
              case 'quote': {
                return (
                  <blockquote key={index}>
                    {serializedChildren}
                  </blockquote>
                );
              }
              case 'link': {
                const fields = node.fields
                return (
                  <CMSLink
                    key={index}
                    newTab={Boolean(fields?.newTab)}
                    reference={fields.doc as any}
                    type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                    url={fields.url}
                  >
                    {serializedChildren}
                  </CMSLink>
                )
              }
  
              default:
                return null;
            }
          }
        })}
      </Fragment>
    );
  }
  