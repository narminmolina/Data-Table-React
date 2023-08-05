import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import express from 'express';

const app = express();

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const fakerDataPath = join(currentDirPath, '..', 'api', 'fakerData.json');

const fakerData = fs.readFileSync(fakerDataPath, 'utf8');
const data = JSON.parse(fakerData);

app.use(cors());

app.get('/api/table-data', (req, res) => {
	const start = Number(req.query.start);
	const size = Number(req.query.size);
	const slicedData = data.slice(start, start + size);

	res.json({
		data: slicedData,
		meta: {
			totalItemCount: data.length,
			pageSize: slicedData.length,
			currentPage: Math.floor(start / size) + 1,
		},
	});
});

app.listen(4200, () => {
	console.log('Server is running on port 4200');
});
