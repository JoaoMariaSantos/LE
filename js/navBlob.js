const svgBlock = document.querySelector('#nav__blob svg');
const blob = svgBlock.querySelector('path');
const toChangeBlob = 4;
const limitChangeBlob = 25;

window.addEventListener('wheel', changeBlockBlob);

function changeBlockBlob() {

    const blobCenter = { x: 30, y: 30 };

    let oldPathSplit = blob.getAttribute("d").split(' ');
    oldPathSplit.splice(0, 3);

    let newPath = 'M 5 30';

    let nodes = [];
    while (oldPathSplit.length > 0) nodes.push(oldPathSplit.splice(0, 7));

    /*
    0        ['C', '45', '22', 
      1                          '47', '20',       '50', '20', 
    1        'C', '54', '20', 
      2                          '54', '23',       '55', '25', 
    2        'C', '56', '27', 
      3                          '53', '30',       '50', '30', 
    3        'C', '47', '30', 
      0                          '45', '28',       '45', '25']
    */

    for (let i = 0; i < nodes.length; i++) {
        const toAddX = Math.random() * toChangeBlob - (toChangeBlob / 2);
        const toAddY = Math.random() * toChangeBlob - (toChangeBlob / 2);

        let j = i - 1;
        while (j < 0) { j = nodes.length - 2 - j }

        let addingX = false, addingY = false;
        
        if (checkThreshold(parseInt(nodes[i][1]) + toAddX, blobCenter.x)) addingX = true;

        if (checkThreshold(parseInt(nodes[i][2]) + toAddY, blobCenter.y)) addingY = true;

        if (addingX) {
            nodes[i][1] = Math.round((parseInt(nodes[i][1]) + toAddX));
            nodes[j][3] = Math.round((parseInt(nodes[j][3]) - toAddX));
        }

        if (addingY) {
            nodes[i][2] = Math.round((parseInt(nodes[i][2]) + toAddY));
            nodes[j][4] = Math.round((parseInt(nodes[j][4]) - toAddY));
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].length; j++) {
            newPath += ' ' + nodes[i][j];
        }
    }

    blob.setAttribute("d", newPath);

    function checkThreshold(value, center){
        if       (value <= center) {
            if   (value >= center - limitChangeBlob &&
                  value <= center - 1) {
                  return true;
            }
        } else if(value >= center) {
            if   (value <= center + limitChangeBlob &&
                  value >= center + 1) {
                  return true;
            }
        }

        return false;
    }
}