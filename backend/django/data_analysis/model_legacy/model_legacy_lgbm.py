import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error, explained_variance_score, mean_absolute_error
import lightgbm as lgb 
import xgboost as xgb
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix

# 데이터 준비
data_2020 = pd.read_csv('backend/django/data_analysis/data/datafile/real_final_2020.csv')
data_2021 = pd.read_csv('backend/django/data_analysis/data/datafile/real_final_2021.csv')
data_2022 = pd.read_csv('backend/django/data_analysis/data/datafile/real_final_2022.csv')
data = pd.concat([data_2020, data_2021, data_2022], axis=0)

# 데이터 정제
data['유동인구(명)'] = data['유동인구(명)'].astype(int)
data['대여소ID'] = data['대여소ID'].str[3:].astype(int)

# 독립변수 및 종속변수 설정
columns_to_keep = [col for col in data.columns if col not in ['대여건수', '반납건수']]
train_x = data[columns_to_keep]
train_y1 = data['대여건수']
train_y2 = data['반납건수']

# 데이터 분할
X_train, X_test, y1_train, y1_test = train_test_split(train_x, train_y1, test_size=0.2, random_state=42)
_, _, y2_train, y2_test = train_test_split(train_x, train_y2, test_size=0.2, random_state=42)


# LGBM 모델
lgbm_model_rent = lgb.LGBMRegressor()
lgbm_model_return = lgb.LGBMRegressor()
lgbm_model_rent.fit(X_train, y1_train)
lgbm_model_return.fit(X_train, y2_train)

# 함수화
def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    return r2, mse, mae, y_pred

# 모델 평가
lgbm_rent_metrics = evaluate_model(lgbm_model_rent, X_test, y1_test)
lgbm_return_metrics = evaluate_model(lgbm_model_return, X_test, y2_test)

# 결과 출력
print("LGBM Rent Metrics:")
print("R2 Score:", lgbm_rent_metrics[0])
print("Mean Squared Error:", lgbm_rent_metrics[1])
print("Mean Absolute Error:", lgbm_rent_metrics[2])

print("LGBM Return Metrics:")
print("R2 Score:", lgbm_return_metrics[0])
print("Mean Squared Error:", lgbm_return_metrics[1])
print("Mean Absolute Error:", lgbm_return_metrics[2])