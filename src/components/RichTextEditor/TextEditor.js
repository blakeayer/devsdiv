import React, { useEffect } from 'react';
import { Editor, RichUtils, convertToRaw } from 'draft-js';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import '../../../node_modules/draft-js/dist/Draft.css';
import './styles.css';

const TextEditor = ({editorState, onChange, passJsonData, readOnly}) => {

    const toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
     };

     const toggleInlineStyle = (inlineStyle) => {
         onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
     };

    const handleKeyCommand = (cmd, editorState) => {
        const cmdState = RichUtils.handleKeyCommand(editorState, cmd)
        if (cmdState) {
            onChange(cmdState);
            return true;
            // return 'handled';
        }
        return false;
        // return 'not-handled';
    }

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'code-block-style'
        }
    };

    // const mapKeyToEditorCommand = (e) => {
    //     if (e.keyCode === 9) {
    //         const newEditorState = RichUtils.onTab(e, editorState, 4);
    //         if (newEditorState !== editorState) {
    //             setEditorState(newEditorState);
    //         }
    //         return;
    //     }
    //     return getDefaultKeyBinding(e);
    // }; 

    useEffect(() => {
        const getContentAsRawJson = () => {
            const contentState = editorState.getCurrentContent();
            const raw = convertToRaw(contentState);
            return JSON.stringify(raw, null, 2);
        };

        passJsonData(getContentAsRawJson());
    }, [editorState, passJsonData])

    return (
        <div className='container'>
            {!readOnly && <div className='menu'>
                <div className='blockStyleControls'>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={toggleBlockType}
                    />
                </div>
                <div className='inlineStyleControls'>
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={toggleInlineStyle}
                    />
                </div>
            </div>}
            <div>
                <Editor
                    editorState={editorState}
                    placeholder="Enter content..." 
                    onChange={onChange} 
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={blockStyleFn}
                    // keyBindingFn={mapKeyToEditorCommand}
                />
            </div>
        </div>
    )
}

export default TextEditor;
