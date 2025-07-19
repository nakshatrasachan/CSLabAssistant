import React, { useEffect } from 'react';

export default function Visualization({ array, selectedAlgo, setArray, onStart, setOnStart, sortingSpeed }) {

  useEffect(() => {
    if (onStart) {
      if (selectedAlgo === "Selection Sort") {
        runSelectionSort();
      } else if(selectedAlgo === "Insertion Sort"){
        runInsertionSort();
      }else if(selectedAlgo === "Quick Sort"){
        runQuickSort();
      }else if(selectedAlgo === "Bubble Sort"){
        runBubbleSort();
      }else if(selectedAlgo === "Merge Sort"){
        runMergeSort();
      }else{
        alert("Sorting algorithm not implemented yet!");
      }
    }
    // eslint-disable-next-line
  }, [onStart]); // <-- Watch onStart changes!

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runSelectionSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      // Swap
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]); // Update UI
      await sleep(sortingSpeed); // Add delay for visualization (you can use sortingSpeed later)
    }
    setOnStart(false);
  };

  const runInsertionSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 1; i < n ; i++) {
      let key = arr[i];
      let j=i-1;
      while(j>=0 && arr[j]>key){
        arr[j+1] = arr[j];
        setArray([...arr]);
        j--;
      }
      arr[j+1]=key;
      // Swap
      
      setArray([...arr]); // Update UI
      await sleep(sortingSpeed); // Add delay for visualization (you can use sortingSpeed later)
    }
    setOnStart(false);
  };
  const Partition=async(arr,low,high,setArray)=>{
    
      let pivot = arr[high];
      let i = low-1;
      for(let j=low;j<=high-1;j++){
        if(arr[j]<pivot){
          i++;
          [arr[j],arr[i]]=[arr[i],arr[j]];
          setArray([...arr]);
          await sleep(sortingSpeed);
        }
      }
    
    [arr[high],arr[i+1]]=[arr[i+1],arr[high]];
    setArray([...arr]);
    await sleep(sortingSpeed);
    return i+1;
  }
  const RecursiveQuickSort=async(arr,low,high,setArray)=>{
    if(low<high){
    let pi = await Partition(arr,low,high,setArray);
    await RecursiveQuickSort(arr,low,pi-1,setArray);
    await RecursiveQuickSort(arr,pi+1,high,setArray);
  }
}
  const runQuickSort = async () => {
    let arr = [...array];
    let n = arr.length;

    await RecursiveQuickSort(arr,0,n-1,setArray);
      
      
    setOnStart(false);
  };

  const runBubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n-1 ; i++) {
      for(let j=0;j<n-1-i;j++){
        if(arr[j]>arr[j+1]){
          [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
          setArray([...arr]);
          await sleep(sortingSpeed);
        }
      }
      
      setArray([...arr]); // Update UI
      await sleep(sortingSpeed); // Add delay for visualization (you can use sortingSpeed later)
    }
    setOnStart(false);
  };
  const RecursiveMergeSort=async(arr,low,high)=>{
    if(low<high){
      let mid = Math.floor((low+high)/2);
      
      await RecursiveMergeSort(arr,low,mid);
      await RecursiveMergeSort(arr,mid+1,high);
      let arrmer = [];
      let i=low,j=mid+1;
      while(i<=mid && j<=high){
          if(arr[i]<arr[j]){
            arrmer.push(arr[i]);
            i++;
          }
          else{
            arrmer.push(arr[j]);
            j++;
          }
        }
        while(i<=mid){
          arrmer.push(arr[i]);
          i++;
        }
        while(j<=high){
          arrmer.push(arr[j]);
          j++;
        }
       
        for (let k = 0; k < arrmer.length; k++) {
            arr[low + k] = arrmer[k];
            setArray([...arr]);
            await sleep(sortingSpeed);
        }
        setArray([...arr]);
        await sleep(sortingSpeed);
        return arrmer;
      }
      
    }
  
  const runMergeSort = async () => {
    let arr = [...array];
    let n = arr.length;

      await RecursiveMergeSort(arr,0,n-1);
      
     
      setOnStart(false);
  };
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '2px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '10px',
      overflow: 'hidden'
    }}>
      {array.map((value, idx) => (
        <div key={idx} style={{
          backgroundColor: '#0e7490',
          height: `${value}px`,
          width: '8px',
          borderRadius: '3px 3px 0 0',
          transition: 'height 0.1s ease'
        }} />
      ))}
    </div>
    
  );
}
