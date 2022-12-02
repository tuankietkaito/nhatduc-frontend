import { ApiResponse, IExamination } from '../utils/types';
import { privateInstance } from './';

const getAllExams = async (customerId?: string): Promise<IExamination[]> => {
  const res: ApiResponse = await privateInstance.get(
    `/exams${customerId ? `?customerId=${customerId}` : ''}`
  );
  return res.payload as IExamination[];
};

const createNewExam = async (data: IExamination): Promise<IExamination> => {
  const res: ApiResponse = await privateInstance.post('/exams', data);
  return res.payload;
};

const updateExam = async (examId: string, data: IExamination): Promise<IExamination> => {
  const res: ApiResponse = await privateInstance.patch(`/exams/${examId}`, data);
  return res.payload;
};

const deleteExam = async (examId: string): Promise<IExamination> => {
  const res: ApiResponse = await privateInstance.delete(`/exams/${examId}`);
  return res.payload;
};

const ExamApi = {
  getAllExams,
  createNewExam,
  updateExam,
  deleteExam
};

export default ExamApi;
