import { DoctorCards } from "./DirectoryPage";
import { getDirectoryDoctors } from "@/lib/public-directory";
export default async function DoctorDirectory() { return <DoctorCards doctors={await getDirectoryDoctors()} />; }
