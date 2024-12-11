import { useState } from "react";

const bloodCompatibility = {
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O+', 'O-'] },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['Everyone'] },
    'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
    'O-': { canDonateTo: ['Everyone'], canReceiveFrom: ['O-'] },
    'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
    'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'] }
};

export function ShowCompatibility(bloodType) {

    const compatibility = bloodCompatibility[bloodType];
    if (!compatibility) {
        return `Unknown blood type: ${bloodType}`;
    }
    let bloodCopatiblity =  `Blood type ${bloodType} can donate to: ${compatibility.canDonateTo.join(', ')} and can receive from: ${compatibility.canReceiveFrom.join(', ')}.`;
    //console.log('can donate' ,compatibility.canDonateTo);
    //console.log('can receive' ,compatibility.canReceiveFrom);

    const canReceiveFrom = compatibility.canReceiveFrom;
    const canDonateTo = compatibility.canDonateTo
    return {canReceiveFrom, canDonateTo} ;
}

// export const BloodTypeRes = () =>{
//  const [canDonateTo, setCanDonateTo] = useState('');
//  const [canReceiveFrom, setCanReceiveFrom] = useState('');

//  const setBloodType=(type)=>{
    
//  }
//     return{}
// } 

