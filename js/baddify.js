/*
 * Turn a name into a breaking bad style name.
 */
var baddify = {

    // List of all the periodic elements.
    elements: ['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al',
               'Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe',
               'Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y',
               'Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te',
               'I','Xe','Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb',
               'Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt',
               'Au','Hg','Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa',
               'U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr','Rf',
               'Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Uut','Uuq','Uup','Uuh',
               'Uus','Uuo'],

    // Baddify a name.
    name: function() {
        // Get name and reset UI.
        var name = document.getElementById('baddifier').value;
        this.ui.reset();

        // Prepare a new name array.  
        var newName = [];
        var nameArray = name.split(' ');

        // For each word in a name, find a corresponding element.
        for (var i = 0; i < nameArray.length; i++) {
            var nameItem = nameArray[i];
            var newNameItem = this.baddifyNameItem(nameItem, true);

            // Push the new word into the name, or push the old word if no
            // match has been found by baddifyNameItem().
            if (newNameItem) {
                newName.push(newNameItem);
            } else {
                newName.push(nameItem);
            }
        }

        // Render the new name in the UI.
        newName = newName.join('&nbsp;&nbsp;&nbsp;');
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerHTML = newName;
    },

    // Look for an element within a name. Ie given Henry, find Helium within
    // that name to produce [He]nry.  Function first looks to two letter
    // elements, then settles for one letter elements if neccesary.
    baddifyNameItem: function(item, lookForTwo) {
        for (var i = 0; i < this.elements.length; i++) {
            
            // Define element and lowercase, searchable versions.
            var element = this.elements[i];
            var lCaseElement = element.toLowerCase();
            var lCaseItem = item.toLowerCase();

            // Determine minimum length of element.
            var minLength = lookForTwo ? 2 : 1;
            var location = lCaseItem.search(lCaseElement);

            // Look for a match and, if found, return with it.
            if (location != -1 && element.length >= minLength) {
                var formattedElement = this.makeFormattedElement(element);
                var newItemArray = item.split('');
                newItemArray.splice(location, element.length, formattedElement);
                return newItemArray.join('');
            }
        }
        
        // Look for single letter elements if no two letter elements are found.
        if (lookForTwo) {
            this.baddifyNameItem(item);
        }

        // return false if nothing is found.
        return false;
    },

    // Create the html element to inject into the name.
    makeFormattedElement: function(element) {
        return '<em>' + element + '</em>';
    },

    // UI object that allows for quick updating of page.
    ui: {

        // Reset UI to original state.
        reset: function() {
            document.getElementById('baddifier') .value = '';
            document.getElementById('result').innerHTML = '';
            document.getElementById('result').style.display = 'none';
        }

    }

};