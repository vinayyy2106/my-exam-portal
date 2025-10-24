import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { encryptKey, decryptData } from "../utils/crypto";
import { useNavigate } from "react-router-dom";

export const AuthContext=()=> {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      
    </div>
  )
}

export default AuthContext
