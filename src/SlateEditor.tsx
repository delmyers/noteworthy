import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { createEditor, Editor, Transforms, Text, DecoratedRange, NodeEntry } from 'slate';
import { Slate, Editable, RenderLeafProps, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import abcjs from 'abcjs';

const SlateEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'X:1\nT:Cooley\'s\nM:4/4\nL:1/8\nK:Emin\n|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\nEBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|' }],
    },
  ];
  const dummyDiv = useRef<HTMLDivElement>(null);

  const decorate = useCallback((entry: NodeEntry): LeafRange[] => {
    const ranges: LeafRange[] = [];
    const node = entry[0];
    const path = entry[1];
    if (Text.isText(node) && dummyDiv.current) {
      const tune = abcjs.renderAbc(dummyDiv.current, node.text, { responsive: "resize" });
      if (tune && tune.length > 0) {
        const lines = tune[0].lines;
        for (const line of lines) {
          for (const staff of line.staff) {
            for (const voice of staff.voices) {
              for (const element of voice) {
                if (element.el_type === 'note') {
                  const start = element.startChar;
                  const end = element.endChar;
                  if (start !== -1 && end !== -1) {
                    ranges.push({
                      anchor: { path, offset: start },
                      focus: { path, offset: end },
                      highlight: true,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    return ranges;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderLeaf={renderLeaf}
          decorate={decorate}
        />
      </Slate>
      <div ref={dummyDiv} style={{ display: 'none' }} />
    </div>
  );
};

type LeafRange = DecoratedRange &
{
  highlight?: boolean;
}

interface LeafProps {
  attributes: {
    'data-slate-leaf': boolean;
  };
  children: React.ReactNode;
    leaf: {
    highlight?: boolean;
    [key: string]: any;
  };
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.highlight) {
    children = <span style={{ color: 'red' }}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};


export default SlateEditor;