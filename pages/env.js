import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import { Box, Switch, Text, Flex, Input, Button, FormControl, FormLabel, VStack, useColorModeValue} from "@chakra-ui/react";
import React from 'react';


const AceEditor = dynamic(
  () => import('react-ace'),
  { ssr: false }
);
// formData is a container/box which holds all the items
// setFormData allows to modify the box
// useState is used to create and manage a piece of state called formData. It returns two elements
// 1. The first element is the current state
// 2. The second element is a function that can be used to update the state.

export default function Home() {
  const [formData, setFormData] = useState({
    
  });

  // So, in this code, there's a special notebook called "editorContent," and it's initially empty. The code also gives you a special pen called "setEditorContent," and you can use this pen to write or draw things inside the notebook whenever you want.
  const [editorMode, setEditorMode] = useState(false);  // Add this to toggle between views

  const [editorContent, setEditorContent] = useState('');  // Add this to hold the editor content

  // there's a special crayon called "useColorModeValue." It's like your magical crayon, and it helps you pick the right color. If it's bright and sunny, it will give you the "white" color, and if it's nighttime or cloudy, it will give you the "gray" color. This way, you always have the right color for the right time!
  const formBackgroundColor = useColorModeValue("white", "gray.800");
  
  console.log("inside env");
  //you might tell your robot, "When the sun comes up, start dancing." The code inside useEffect(() => {...}) is like the dancing your robot will do when the sun comes up.
  //instead of the sun, we might be talking about when something changes on a computer screen or when a button is clicked. The useEffect part helps us make the robot (or our code) do the right thing at the right time automatically.
  useEffect(() => {
  // In your web code, you're telling your web application to send a request to the server at the /api/get-file endpoint to get some data or perform some action
    fetch('/api/get-file')
      
      .then(res => res.text())
      .then(data => {
        setEditorContent(data);
        console.log("data looks like",data);
      });
  }, []); 
  
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   // console.log("e.target.nam");
  //   // console.log(e.target.name);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Use the spread operator to copy the existing form data
    // and update the changed field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.files[0].name });
  // }
 
  console.log("hi1");


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit");
   
  
    // Ensure 'port' is a number if it's not empty
    const formDataForServer = {
      ...formData,
      port: formData.port ? Number(formData.port) : '',
    };

    

    console.log("fromDtoS");
   
    const res = await fetch('/api/save-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataForServer),
    });

    
  
    // log the response
    const data = await res.json();
    console.log(data);
  
    // Check for errors
    if (!res.ok) {
      console.error('Failed to save configuration');
    }
  };
  const handleEditorChange = (value) => {
    setEditorContent(value);  // update the editor content state
  }
  
  const handleEditorSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/save-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: editorContent}),  // Send editor content to server
    });
    
    // Check for errors
    if (!res.ok) {
      console.error('Failed to save file');
    }
  }
  

  return (
    <Box p={6}>
      <Flex position="absolute" top="20" right="5" alignItems="center">
        <Switch colorScheme="blue" isChecked={editorMode} onChange={() => setEditorMode(!editorMode)} />
        <Text ml={2}>
            Editor View
        </Text>
      </Flex>
      {editorMode ? (
        <VStack as="form" spacing={4} onSubmit={handleEditorSubmit}>
          <Text fontSize="2xl" fontWeight="bold">Env File Configuration - Editor</Text>
          <AceEditor
            mode="json"
            theme="github"
            value={editorContent}
            onChange={handleEditorChange}
            name="aceEditor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
          />
          <Button colorScheme="blue" type="submit">Save Configuration</Button>
        </VStack>
      ) : (
        <VStack          
        as="form" 
        spacing={4} 
        onSubmit={handleSubmit}
        w="full" 
        bg={formBackgroundColor}  
        p={6} 
        boxShadow="md" 
        rounded="md">

          <Text fontSize="2xl" fontWeight="bold">File Configuration</Text>
          <Text>
            This page allows you to set up the environment for the test. All paths should be absolute paths. Fill yang_dir and deviation_source_file or just provide the openconfig_pkg location. If all are provided, openconfig_pkg will take priority. If file is uploaded, and is a directory please upload a zipped .tgz file.
          </Text>
          
          {[
            'Yang Directory (Juniper directory that contains all openconfig files - from release branch or dcb)',
            'Deviation Source File (File that contains juniper deviations)',
            'Openconfig Package',
            'Platform Annotation File',
            'Plguin Directory',
            'Device Under Test (Device Name or IP)',
            'gNMI Port',
            'username',
            'password',
            'Test Release',
            'Test Platform'
          ].map((labelText, idx) => (
            <FormControl key={idx}>
              <FormLabel>{labelText}</FormLabel>
              <Input
                type={idx === 8 ? "password" : "text"}
                name={labelText.toLowerCase().replace(/\s+/g, "_")} // Create a name based on the label text
                value={formData[labelText.toLowerCase().replace(/\s+/g, "_")]} // Use dynamic value based on name
                onChange={handleChange}
              />
            </FormControl>
          ))}
          
          {/* // ((labelText, idx) => (
          //   <FormControl key={idx}>
          //     <FormLabel>{labelText}</FormLabel>
          //     <Input type={idx === 8 ? "password" : "text"} value=formData.yang_dir onChange={handleChange} />
          //   </FormControl>
          // ))} */}

          <Button colorScheme="blue" type="submit">Save Configuration</Button>
        </VStack>
      )}
    </Box>
  );
}

