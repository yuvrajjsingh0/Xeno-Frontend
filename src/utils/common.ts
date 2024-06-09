import { Bounce, toast } from "react-toastify";

export function formatUnixTimestamp(unixTimestamp: number) {
    const date = new Date(unixTimestamp);
    const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

type AnyObject = { [key: string]: any };

function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

export function removeEmptyKeys(obj: AnyObject): AnyObject {
  return Object.entries(obj)
    .filter(([_, value]) => !isEmpty(value))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export function cleanArrayOfObjects(arr: AnyObject[]): AnyObject[] {
  return arr.map(removeEmptyKeys);
}

export function errorToast(content: string){
    return toast.error(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export function successToast(content: string){
    return toast.success(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}