const SLICE_SIZE = 1024 * 1024;

export default function fileSlice(file, sliceSize = SLICE_SIZE) {
	const isFile = file instanceof File;
	if(!isFile) {
		return [];
	}

	const fileSize = file.size;

	if(fileSize <= sliceSize) {
		return [file];
	}

	const sliceFiles = [];
	let sliceLen = (fileSize / sliceSize) >> 0;
	
	if(fileSize % sliceSize > 0) {
		sliceLen++;
	}

	let start = 0;
	let end = sliceSize;
	
	for(let l = 0; l < sliceLen; l++) {
		const tmp = file.slice(start, end);
		tmp.chunkid = l;
		sliceFiles.push(tmp);
		
		start = end;
		end += sliceSize; 
	}

	return sliceFiles;
}