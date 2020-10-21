// Generate HTML for a Manager Object! In which the HTML will be generated to a broweser. 
//Changing the class section seting oother office numbers. 

const generateManager = manager => {
    return `
              <div class = "card col-2 text-center p-2 m-3 border-warning">
                <div class = "card-header bg-warning text-light">
                  <h5 class = "card-title">
                    ${manager.name} <br>
                    Manager
                  </h5>
                </div>
                <div class = "card-body">
                  <p class = "card-text">
                    ID: ${manager.id}
                  </p>
                  <p class = "card-text">
                    Email: <a href="mailto:${manager.email}">${manager.email}</a>
                  </p>
                  <p class = "card-text">
                    Office Number: ${manager.officeNumber}
                  </p>
                </div>
              </div>
    `
  }
  
  // Generate HTML for the Engineer object! 

  const generateEngineer = engineer => {
    return `
              <div class = "card col-2 text-center p-2 m-3 border-warning">
                <div class = "card-header bg-warning text-light">
                  <h5 class = "card-title">
                    ${engineer.name} <br>
                    Engineer
                  </h5>
                </div>
                <div class = "card-body">
                  <p class = "card-text">
                    ID: ${engineer.id}
                  </p>
                  <p class = "card-text">
                    Email: <a href="mailto:${engineer.email}">${engineer.email}</a>
                  </p>
                  <p class = "card-text">
                    GitHub: <a href="https://github.com/${engineer.github}" target = "_blank">${engineer.github}</a>
                  </p>
                </div>
              </div>
    `
  }
  
  // Generate HTML for the Intern object!

  const generateIntern = intern => {
    return `
              <div class = "card col-2 text-center p-2 m-3 border-warning">
                <div class = "card-header bg-warning text-light">
                  <h5 class = "card-title">
                    ${intern.name} <br>
                    Intern
                  </h5>
                </div>
                <div class = "card-body">
                  <p class = "card-text">
                    ID: ${intern.id}
                  </p>
                  <p class = "card-text">
                    Email: <a href="mailto:${intern.email}">${intern.email}</a>
                  </p>
                  <p class = "card-text">
                    School: ${intern.school}
                  </p>
                </div>
              </div>
    `
  }
  
  // Generate HTML for the team of employees!

  const generateTeam = teamData => {
    var ret = "";
    for(var i = 0; i < teamData.length; i ++){
      if(teamData[i].getRole() == 'Manager'){
        ret = ret.concat(generateManager(teamData[i]));
      }
      else if(teamData[i].getRole() == 'Engineer'){
        ret = ret.concat(generateEngineer(teamData[i]));
      }
      else{
        ret = ret.concat(generateIntern(teamData[i]));
      }
    }
  
    return ret;
  }
  
  // Exporting the HTML given the Team data!
  
  module.exports = teamData => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="../src/style.css">
      </head>
      
      <body>
        <header class = "bg-dark text-light p-3">
          <h1 class = "text-center">
            My Team
          </h1>
        </header>
      
        <main>
          <div class = "d-flex flex-column">
            <div class = "row justify-content-center">
              ${generateTeam(teamData)}
            </div>
          </div>
        </main>
      </body>
      </html>
      `;
    };