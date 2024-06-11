const API_URL="http://localhost:3000";

export const getAudienceByRules = (rules: any): Promise<any[]> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/customers/rules`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({rules}),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then(audience => {
                resolve(audience);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const createAudience = (audience: Audience): Promise<any[]> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/audiences`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(audience),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then(res => {
                resolve(res);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const getAudiences = (): Promise<Audience[]> => {
    console.log("token", localStorage.getItem("token"));
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/audiences`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`
                }
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then((res: Audience[]) => {
                resolve(res);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const getAudience = (id: number): Promise<Audience> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/audiences/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`
                }
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then((res: Audience) => {
                resolve(res);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const startCampaign = (audienceId: number): Promise<any[]> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/audiences/${audienceId}/startCampaign`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then(res => {
                resolve(res);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const getCampaignLogs = (audienceId: number): Promise<CampaignLog[]> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/audiences/${audienceId}/campaignLog`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")!}`
                }
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
                  if(response.status == 401){
                    reject("Not Logged in");
                    localStorage.clear();
                  }
                }
                return response.json();
            })
            .then((res: CampaignLog[]) => {
                resolve(res);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}

export const loginWithGoogle = (authorizationCode: string) => {
    return new Promise(async (resolve, reject) => {
        try{
            await fetch(`${API_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: authorizationCode }),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("token", data.token);
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        }catch(err){
            reject(err);
        }
        
    });
    
}