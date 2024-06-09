export const getAudienceByRules = (rules: any): Promise<any[]> => {
    return new Promise(async(resolve, reject) => {
        try{
            await fetch('http://localhost:3000/api/customers_by_rules', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({rules}),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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
            await fetch('http://localhost:3000/api/audiences', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(audience),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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
    return new Promise(async(resolve, reject) => {
        try{
            await fetch('http://localhost:3000/api/audiences', {
                method: 'GET'
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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
            await fetch(`http://localhost:3000/api/audience/${id}`, {
                method: 'GET'
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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
            await fetch(`http://localhost:3000/api/audience/${audienceId}/startCampaign`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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
            await fetch(`http://localhost:3000/api/audience/${audienceId}/campaignLog`, {
                method: 'GET'
            }).then(response => {
                if (!response.ok) {
                  reject('Network response was not ok');
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