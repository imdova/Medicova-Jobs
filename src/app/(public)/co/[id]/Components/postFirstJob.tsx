import Image from "next/image";
import post from "@/components/images/post.svg";
import { Company } from "@/types";
import AddNewJobButton from "./Modals/addNewJobButton";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";

export const PostYourFirstJob = async ({
    company,
}: { company: Company }) => {
    const result = await getJobsByCompanyId(company.id, 1, 10);
    if (!result.success) return null;
    const { data: jobs, total } = result.data || { data: [], total: 0 };
    if (total > 0) return null
    return (
        <div className="relative mb-5 rounded-base border border-gray-100 bg-white p-4 shadow-soft md:p-5">
            <div className="flex flex-col items-center gap-2">
                {/* Centered Image */}
                <Image
                    src={post}
                    alt="Login Cover"
                    width={50}
                    height={50}
                    priority={true}
                />

                {/* Typography below the Image */}
                <p className="mb-2 text-center font-semibold text-secondary">
                    To find better candidates, make your job description detailed, use
                    relevant keywords, and add screening questions to your job post.
                </p>
            </div>

            {/* Centered Button */}
            <div className="flex justify-center">
                <AddNewJobButton company={company}
                    variant="contained"
                    btnVariant="button"
                >
                    Post a job for free
                </AddNewJobButton>
            </div>
        </div>
    );
};


export default PostYourFirstJob