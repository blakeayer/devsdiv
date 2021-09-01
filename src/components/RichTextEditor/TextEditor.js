import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import '../../../node_modules/draft-js/dist/Draft.css';
import './styles.css';

const TextEditor = ({passJsonData}) => {
    
    const [ editorState, setEditorState ] = useState(() => 
        EditorState.createEmpty(),
    );

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
     };

     const toggleInlineStyle = (inlineStyle) => {
         setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
     };

    const handleKeyCommand = (cmd, editorState) => {
        const cmdState = RichUtils.handleKeyCommand(editorState, cmd)
        if (cmdState) {
            setEditorState(cmdState);
            return true;
            // return 'handled';
        }
        return false;
        // return 'not-handled';
    }

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

    const getContentAsRawJson = () => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        return JSON.stringify(raw, null, 2);
    };

    useEffect(() => {
        passJsonData(getContentAsRawJson());
    }, [editorState, passJsonData, getContentAsRawJson])

    return (
        <div className='container'>
            <div className='menu'>
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
            </div>
            <div>
                <Editor
                    placeholder="Enter content..." 
                    editorState={editorState} 
                    onChange={setEditorState} 
                    handleKeyCommand={handleKeyCommand}
                    // keyBindingFn={mapKeyToEditorCommand}
                />
            </div>
        </div>
    )
}

export default TextEditor;
