import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const stringToColor = (str: string) => {

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash)

    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF
      color += ("00" + value.toString(16)).substr(-2)
    }

    return color
  }
}

// // =========================================================================================================================
/// WELL COMMENTED CODE FOR UNDERSTANDING AND NOT BREAKING ORIGINAL CODE 
// // =========================================================================================================================

// // // Importing the ClassValue type and clsx function from the 'clsx' package.
// // import { type ClassValue, clsx } from "clsx"
// // // Importing the twMerge function from the 'tailwind-merge' package.
// // import { twMerge } from "tailwind-merge"

// // // Exporting the 'cn' function, which accepts a variable number of ClassValue arguments.
// // export function cn(...inputs: ClassValue[]) {
// //   // Returns the result of combining the class names using clsx and then merging them with twMerge.
// //   return twMerge(clsx(inputs))
// // }


// // // Exporting the 'stringToColor' function which takes a string as an argument.
// // export const stringToColor = (str: string) => {
// //   // Initializing a hash variable.
// //   let hash = 0
// //   // Looping through each character of the string.
// //   for (let i = 0; i < str.length; i++) {
// //     // Calculating the hash value based on the character code of the string.
// //     hash = str.charCodeAt(1) + ((hash << 5) - hash)

// //     // Initializing the color string with a '#'.
// //     let color = '#'
// //     // Looping three times to construct the color.
// //     for (let i = 0; i < 3; i++) {
// //       // Extracting a value from the hash and converting it to a hexadecimal string.
// //       const value = (hash >> (i * 8)) & 0xFF
// //       color += ("00" + value.toString(16)).substr(-2)
// //     }

// //     // Returning the constructed color.
// //     return color
// //   }
// // }
