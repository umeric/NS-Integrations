Netsuite to Power BI
1.	Create a blank .csv file in Netsuite File Cabinet. 
Be sure to check the box “ Available without login”. This is NEEDED to access the file. 
Note down the file ID (Ex. https://****-sb1.app.netsuite.com/core/media....)
 
2.	Create a save search. 
Note the save search ID (Ex. 4439)
 
3.	Create a schedule script that will copy the data from the save search into the csv every 15 minutes.
Schedule Script:
/** 
 * @NApiVersion 2.x 
 * @NScriptType ScheduledScript 
 * @NModuleScope SameAccount 
 */
define(['N/task'], function(task) {

    const keys = [ 
        [93710, 4591], [93715, 4439]  // csvID savesearchID
    ];

    function execute(scriptContext) {
        for(var i = 0; i < keys.length; i++) { 
            // Create and submit the search task
            var searchTask = task.create({ 
                taskType: task.TaskType.SEARCH 
            });
            searchTask.savedSearchId = keys[i][1]; 
            searchTask.fileId = keys[i][0]; 
            var searchTaskId = searchTask.submit(); 
        }
    }

    return { 
        execute: execute 
    }; 
});
4.	Once created, deploy the script configure the deployment with the setting below:
Schedule: Daily Event, Repeat every 1 day(s)
Start Date: {Date Deployment}, Start Time: 6:00 am, Repeat: Every 15 minutes,
Status: Scheduled, Log Level: Audit, Execute As Role: Administrator, Priority: High

5.	Go to Power BI Desktop or Power BI Online and go to your workspace.
6.	
7.	Click the “New” button > select the Sematic Model > select CSV > 
 
8.	Copy your .csv url file in your Netsuite File Cabinet and paste it in the File path or URL. 
 
9.	Select Basic Authentication kind and enter your netsuite username and password

10.	Once entered and connected, a preview of the data should display. If you are not seeing anything, ensure your schedule script is deployed and scheduled as needed and refresh the preview.
 
11.	After validating all the data is populated as expected go to your sematic model in the workspace and hover over the model and schedule your refresh times.
 
