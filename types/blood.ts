export interface DonorInfo {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
}

export interface DonationItem {
  id: string;
  paymentStatus?: "PENDING" | "PAID";
  donor?: DonorInfo;
}

export interface BloodRequest {
  id: string;
  bloodGroup: string;
  bagsNeeded: number;
  hospitalName: string;
  hospitalAddress?: string;
  city: string;
  urgency: "NORMAL" | "URGENT" | "CRITICAL";
  status: "PENDING" | "VERIFIED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  neededBy: string;
  donations?: DonationItem[];
}