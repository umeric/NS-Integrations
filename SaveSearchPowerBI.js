/** 
 * @NApiVersion 2.x 
 * @NScriptType ScheduledScript 
 * @NModuleScope SameAccount 
 */
define(['N/task'], function(task) {

  // csvID savesearchID
    const keys = [ 
        [101354, 4490], /*project action*/
        [106529, 5131] /*revenue*/
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
