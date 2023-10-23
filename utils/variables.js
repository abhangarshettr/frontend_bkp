

// pages/api/execute.js
//commands to run the backend FILENAME is replaced with the filename
export const command_header = `cd ../backend && python xpath_tester.py -f FILENAME -g `

export function createCommandWithHeader(filename, headerFilename) {
    return command_header.replace('FILENAME', filename).replace('-g', `-d ${headerFilename}`);
}

// pages/api/files.js
export const extractPath = '/tmp/tmp_pkg'; //path to where the .tgz file will be extracted
export const envFilePath = '../backend/xpath_env.yaml' //path to the environment file
export const nameoOfPkgFileInYaml = 'openconfig_package' // name of the pkg file key in the environment file
export const locationInPkg = 'openconfig/yang' // location of the yang files in the pkg file


// pages/api/save-config.js
// uses the environment file path (envFilePath) from the previous snippet

// pages/api/filenames.js
export const filenamesPath = '../backend/filenames.yaml' // path to the file containing the filenames
export const headerVarNameInYaml = 'xpath_data_header_filename' // name of the header variable in the filenames file
export const rpcVarNameInYaml = 'xpath_rpc_mapping_filename' // name of the rpc variable in the filenames file
export const datasetVarNameInYaml = 'dataset_filename' // name of the dataset variable in the filenames file

// pages/api/headerFiles.js
export const backendPath = '../backend' // path to the backend folder

// pages/api/htmlFileContent.js
// uses the backend path (backendPath) from the previous snippet

// pages/api/htmlFiles.js
// uses the backend path (backendPath) from the previous snippet

// pages/api/save-config.js
// uses the environment file path (envFilePath) from the previous snippet

// pages/api/test.js
export function createTestCommand(filename, useDataSet, selectedDataSet, useRPCMapping, selectedRPCMapping, executeAllPaths){
    // Construct the command
    let command = `cd ../backend ;python xpath_tester.py -f ${filename} -e`;

    if (useDataSet) {
        command += ` -s ${selectedDataSet}`
    }
    if (useRPCMapping) {
        command += ` -r ${selectedRPCMapping}`
    }
    if (executeAllPaths) {
        command += ` -a`
    }
    return command;
} // edit this function in case there is changes to the way the test command is being used. 
