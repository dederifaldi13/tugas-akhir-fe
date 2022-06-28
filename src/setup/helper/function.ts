import Resizer from "react-image-file-resizer";

export const convertBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const dataURLtoFile = (dataurl: string, filename: string) => {
    // export const dataURLtoFile = (dataurl, filename) =>
    let arr = dataurl.split(","),
        // mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + ".jpg", {
        type: "image/jpg"
    });
};

export const resizeFile = (file: any) =>
    new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            720,
            1366,
            "JPEG",
            50,
            0,
            (uri: unknown) => {
                resolve(uri);
            },
            "base64"
        );
    });