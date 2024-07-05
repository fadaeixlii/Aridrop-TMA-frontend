import { useEffect, useState } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import api from "utils/axiosConfig";
import User from "assets/user.svg";
interface TelegramProfileImageProps {
  telegramId: string;
  className?: string;
}

const TelegramProfileImage: React.FC<TelegramProfileImageProps> = ({
  telegramId,
  className,
}) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await api.get(`/telegram-profile-image/${telegramId}`);
        setProfileImageUrl(response.data.profileImageUrl);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [telegramId]);

  if (loading) {
    return (
      <div className="flex justify-center shrink-0">
        <img src={User} className={twMerge("size-10", className)} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center shrink-0">
        <img src={User} className={twMerge("size-10", className)} />
      </div>
    );
  }

  return (
    <div className="flex justify-center shrink-0">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="Telegram Profile"
          className={twMerge("size-10 rounded-full", className)}
        />
      ) : (
        <PiUserCircleDuotone className={twMerge("size-10", className)} />
      )}
    </div>
  );
};

export default TelegramProfileImage;
