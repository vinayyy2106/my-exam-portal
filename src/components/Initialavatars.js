import React from 'react'

export const Initialavatars=({ name, imageUrl, size })=> {
    const getInitials = (fullName) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
    const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
    
  }
  return (
    <div
      style={{ width: size, height: size, fontSize: size / 2 }}
      className="bg-blue-600 text-white font-semibold flex items-center justify-center rounded-full"
    >
      {getInitials(name)}
    </div>
  );
}
