import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import {
  Box,
  Heading,
  Select,
  Checkbox,
  Button,
  VStack,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';

const DynamicAceEditor = dynamic(
  import('react-ace'),
  { ssr: false }
);


console.log("inside create ");
export default function Home() {
  console.log("inside home ");
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [editMode, setEditMode] = useState('')
  const [filenames, setFilenames] = useState({})
  const [useHeaderFile, setUseHeaderFile] = useState(false);
  const [headerFiles, setHeaderFiles] = useState([]);
  const [selectedHeaderFile, setSelectedHeaderFile] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonBg = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBg = useColorModeValue("teal.600", "teal.400");

  console.log("beofre files api in home ");

  useEffect(() => {
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    axios.get('/api/headerFiles')
      .then(response => setHeaderFiles(response.data))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    if (editMode) {
      axios.get(`/api/filenames?editMode=${editMode}`)
        .then(response => {
          const filename = response.data.filename;
          setFilenames(prev => ({ ...prev, [editMode]: filename }));
        })
        .catch(error => console.error(error));
    } else {
      setFilenames({});
    }
  }, [editMode]);
  

  useEffect(() => {
    if (editMode && filenames[editMode]) {
      axios.get(`/api/file?filename=${filenames[editMode]}`)
        .then(response => setFileContent(response.data.content))
        .catch(error => {
          console.error('Error fetching file', error);
          setFileContent(''); // clear the content if there's an error
        });
    } else {
      setFileContent(''); // clear the content if there's no filename or no editMode
    }
  }, [editMode, filenames]);



  const handleFileChange = (event) => {
    setSelectedFile(event.target.value)
  }

  const handleEditModeChange = (event) => {
    setEditMode(event.target.value)
  }

  const executeCommand = () => {
    if (selectedFile) {
      setLoading(true);
      axios.post('/api/execute', {
        filename: selectedFile,
        headerFilename: useHeaderFile ? selectedHeaderFile : null,
      })
      .then(response => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    } else {
      console.error('No file selected');
    }
  };
  

  const saveFile = () => {
    if (editMode && filenames[editMode]) {
      axios.post('/api/file', { filename: filenames[editMode], content: fileContent })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    } else {
      console.error('No file or edit mode selected');
    }
  };
  

  return (
    <Box>
    <VStack
        p={4}
        bg={useColorModeValue("gray.100", "gray.700")}
        color={useColorModeValue("gray.700", "gray.100")}
        spacing={4}
        align="left"
    >        <Heading as="h1" size="lg" color={useColorModeValue("indigo.700", "indigo.300")}>
            Select a Yang Model
        </Heading>      

        
        <Select 
          value={selectedFile}
          onChange={handleFileChange}
        >
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </Select>
        


        <Checkbox 
          colorScheme="teal" 
          isChecked={useHeaderFile} 
          onChange={() => setUseHeaderFile(!useHeaderFile)}
        >
          Use a header file
        </Checkbox>

        {useHeaderFile && (
          <Select
            value={selectedHeaderFile}
            onChange={event => setSelectedHeaderFile(event.target.value)}
          >
            {headerFiles.map(file => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </Select>
        )}
        
        <Button
          colorScheme="teal"
          isLoading={loading}
          loadingText="Generating..."
          onClick={executeCommand}
        >
          Generate Config Files
        </Button>
        
        <Select
          value={editMode}
          onChange={handleEditModeChange}
        >
          <option value="">-- Select Edit Mode --</option>
          <option value="header">Edit Header</option>
          <option value="rpc">Edit RPC Mapping</option>
          <option value="dataset">Edit Dataset</option>
        </Select>
        
        {editMode && (
          <>
            <Box mt={4} w="full">
              <DynamicAceEditor
                mode="javascript"
                theme="monokai"
                onChange={setFileContent}
                value={fileContent}
                name="EDITBOX"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '100%', height: '750px' }}
              />
            </Box>
            
            <Button colorScheme="teal" onClick={saveFile}>
              Save File
            </Button>
          </>
        )}

      </VStack>
    </Box>
  );




}
