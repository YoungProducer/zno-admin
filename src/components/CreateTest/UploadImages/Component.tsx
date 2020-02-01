// Created by: Oleksandr Bezrukov
// Creation date: 31 January 2020

// Component to upload task and explanation images.

// External imports
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Component = () => {

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
    },                         []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                    {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
            </div>
        </div>
    );
};

export default Component;
