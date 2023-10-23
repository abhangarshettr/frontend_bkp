// /pages/test.js
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import {
    Box,
    Heading,
    Select,
    Checkbox,
    Button,
    Text,
    useColorModeValue,
    VStack,
    HStack
} from "@chakra-ui/react";


export default function Test() {
  const [files, setFiles] = useState([])
  const [dataSets, setDataSets] = useState([])
  const [rpcMappings, setRpcMappings] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [useDataSet, setUseDataSet] = useState(false)
  const [useRPCMapping, setUseRPCMapping] = useState(false)
  const [selectedDataSet, setSelectedDataSet] = useState('')
  const [selectedRPCMapping, setSelectedRPCMapping] = useState('')
  const [executeAllPaths, setExecuteAllPaths] = useState(false)
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [selectedHtml, setSelectedHtml] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [logContent, setLogContent] = useState('');
  const logContentRef = useRef(null);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (logContentRef.current) {
      logContentRef.current.scrollTop = logContentRef.current.scrollHeight;
    }
  }, [logContent]);
  
  useEffect(() => {
    axios.get('/api/headerFiles')
      .then(response => {
        setDataSets(response.data)
        setRpcMappings(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('/api/htmlFiles') 
      .then(response => setHtmlFiles(response.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
  if (selectedFile) {
    const eventSource = new EventSource(`/api/tail?filename=${selectedFile}`)

    eventSource.onmessage = (event) => {
      setLogContent((prevContent) => prevContent + '\n' + event.data)
    }

    return () => {
      eventSource.close()
    }
  }
}, [selectedFile])

  const handleHtmlChange = (event) => {
    setSelectedHtml(event.target.value);
    axios.get(`/api/htmlFileContent?filename=${event.target.value}`) 
      .then(response => setHtmlContent(response.data))
      .catch(error => console.error(error))
  }

  const executeTest = () => {
    if (selectedFile) {
      setIsTestRunning(true);
      setIsLoading(true); 
      let args = {
        filename: selectedFile,
        useDataSet: useDataSet,
        useRPCMapping: useRPCMapping,
        selectedDataSet: selectedDataSet,
        selectedRPCMapping: selectedRPCMapping,
        executeAllPaths: executeAllPaths
      }
      axios.post('/api/test', args)
      .then(response => {
        console.log(response.data);
        setIsLoading(false); // set loading to false
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // set loading to false
      })
    } else {
      console.error('No file selected')
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value)
  }

  return (
    <VStack
        p={4}
        bg={useColorModeValue("gray.100", "gray.700")}
        color={useColorModeValue("gray.700", "gray.100")}
        spacing={4}
        align="left"
    >
        <Heading as="h1" size="lg" color={useColorModeValue("indigo.700", "indigo.300")}>
            Select a Yang Model to Test
        </Heading>

        <Select
            value={selectedFile}
            onChange={handleFileChange}
            focusBorderColor="indigo.300"
        >
            {files.map((file) => (
                <option key={file} value={file}>
                    {file}
                </option>
            ))}
        </Select>

        <HStack spacing={3}>
            <Checkbox isChecked={useDataSet} onChange={(e) => setUseDataSet(e.target.checked)}>
                Use Dataset
            </Checkbox>
        </HStack>

        {useDataSet && (
            <Select
                value={selectedDataSet}
                onChange={(e) => setSelectedDataSet(e.target.value)}
                focusBorderColor="indigo.300"
            >
                {dataSets.map((dataSet) => (
                    <option key={dataSet} value={dataSet}>
                        {dataSet}
                    </option>
                ))}
            </Select>
        )}

        <HStack spacing={3}>
            <Checkbox
                isChecked={useRPCMapping}
                onChange={(e) => setUseRPCMapping(e.target.checked)}
            >
                Use RPC Mapping
            </Checkbox>
        </HStack>

        {useRPCMapping && (
            <Select
                value={selectedRPCMapping}
                onChange={(e) => setSelectedRPCMapping(e.target.value)}
                focusBorderColor="indigo.300"
            >
                {rpcMappings.map((rpcMapping) => (
                    <option key={rpcMapping} value={rpcMapping}>
                        {rpcMapping}
                    </option>
                ))}
            </Select>
        )}

        <HStack spacing={3}>
            <Checkbox
                isChecked={executeAllPaths}
                onChange={(e) => setExecuteAllPaths(e.target.checked)}
            >
                Execute All Paths
            </Checkbox>
        </HStack>

        <Button
            onClick={executeTest}
            colorScheme="teal"
            isLoading={isLoading}
            spinner={<BeatLoader size={15} />}
        >
            Execute Tests
        </Button>

        {isTestRunning && (<div ref={logContentRef} style={{ 
        overflow: 'auto', 
        maxHeight: '200px', 
        backgroundColor: '#282c34',
        color: '#a9a9a9', 
        border: '1px solid #555555', 
        borderRadius: '4px',
        padding: '10px', 
        fontFamily: 'Courier, monospace',
        fontSize: '0.9em', 
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word' 
    }}>
        <pre>{logContent}</pre>
    </div>)}

        <Heading as="h2" size="md" fontWeight="bold">
            Select a Report to view:
        </Heading>

        <Select
            value={selectedHtml}
            onChange={handleHtmlChange}
            focusBorderColor="indigo.300"
        >
            {htmlFiles.map((file) => (
                <option key={file} value={file}>
                    {file}
                </option>
            ))}
        </Select>

        <Box
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius="md"
        >
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Box>
    </VStack>
);





}

