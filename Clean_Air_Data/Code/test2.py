import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output

import pandas as pd

df = pd.read_csv('../Resources/airdata.csv')

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

app.layout = html.Div([
    dcc.Graph(id='graph-with-slider'),
    dcc.Slider(
        id='date-slider',
        min=df['Date'].min(),
        max=df['Date'].max(),
        value=df['Date'].min(),
        marks={str(date): str(date) for date in df['Date'].unique()},
        step=None
    )
])


@app.callback(
    Output('graph-with-slider', 'figure'),
    [Input('date-slider', 'value')])
def update_figure(selected_date):
    filtered_df = df[df.date == selected_date]
    traces = []
    for i in filtered_df.continent.unique():
        df_by_city = filtered_df[filtered_df['City'] == i]
        traces.append(dict(
            x=df_by_city['Date'],
            y=df_by_city['median'],
            text=df_by_city['City'],
            mode='markers',
            opacity=0.7,
            marker={
                'size': 15,
                'line': {'width': 0.5, 'color': 'white'}
            },
            name=i
        ))

    return {
        'data': traces,
        'layout': dict(
            xaxis={'type': 'log', 'title': 'PM2.5 Median',
                   'range':[2.3, 4.8]},
            yaxis={'title': 'Date', 'range': [20, 90]},
            margin={'l': 40, 'b': 40, 't': 10, 'r': 10},
            legend={'x': 0, 'y': 1},
            hovermode='closest',
            transition = {'duration': 500},
        )
    }


if __name__ == '__main__':
    app.run_server(debug=True)