import Image, { ImageProps } from "next/image";

const UserAvatar: React.FC<ImageProps> = (props) => {
  return props.src ? (
    <Image
      {...props}
      src={props.src}
      alt={props.alt}
      className={`h-${props.height}px w-${props.width}px rounded-full object-cover transition-transform duration-150 hover:scale-105 hover:shadow-md`}
    />
  ) : (
    <div
      className={`flex h-${props.height}px w-${props.width}px items-center rounded-full bg-gray-500 transition-transform duration-150 hover:scale-105 hover:shadow-md`}
    >
      <span className="w-full text-center text-3xl uppercase text-inherit">
        {props.alt?.[0] ?? ""}
      </span>
    </div>
  );
};

export default UserAvatar;
