# format-files  
Small script to format all files in a directory  
  
> npm i @x1289/format-files  

## API:  

  
  
### handleAllFiles(dirPath, formatFunc)  
  
dirPath:      Path to directory to format.  
formatFunc:   Function to apply to every line of every file in the directory.  
  

  
### formatFile(filePath, formatFunc)  
  
filePath:     File to format.  
formatFunc:   Function to apply to every line of every file in the directory.  
  
  
  
  
## Example  

#### To remove all trailing whitespaces and add uniform EOL character
> const { handleAllFiles } = require('format-files')
> 
> await handleAllFiles('./testing/', (str) => {  
>    return str.trimRight() + '\n';  
>  });  

#### To make every line uppercase
> const { handleAllFiles } = require('format-files')
> 
> await handleAllFiles('./testing/', (str) => {  
>    return str.toUpperCase() + '\n';  
>  });  